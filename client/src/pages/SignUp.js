import { React, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isEmptyInput, validateInput } from '../utils/validation';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations/userMutations';
import Auth from '../utils/auth';
import '../style/SignUp.css';

import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      marginBottom='10%'
      {...props}
    >
      {'Copyright © '}
      <a
        target='_blank'
        href='https://github.com/UserOlena/Learnify/blob/main/LICENSE'
        style={{
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        Learnify
      </a>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export function SignUp() {
  const inputDefaultValues = {
    value: '',
    isEmpty: false,
    isValid: true,
    isMatch: true,
    isDuplicate: false,
  };

  const [userName, setUserName] = useState(inputDefaultValues);
  const [email, setEmail] = useState(inputDefaultValues);
  const [password, setPassword] = useState(inputDefaultValues);
  const [confirmPassword, setConfirmPassword] = useState(inputDefaultValues);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const notValidPasswordErrorMessage =
    'Password should consist of at least one digit, one special character, one uppercase letter, one lowercase letter and have 8 to 16 characters';
  const notValidUserNameErrorMessage =
    'Username should consist of 4 to 12 alphanumeric characters.';

  // on form submit call mutation query, passing fields value in order to create a new user and token
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      const { data } = await addUser({
        variables: {
          username: userName.value,
          email: email.value,
          password: password.value,
        },
      });
      console.log(data.addUser.user);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err.graphQLErrors[0].message);
      switch (err.graphQLErrors[0].message) {
        case 'Duplicate username':
          changeIsDuplicateToTrue(setUserName);
          break;
        case 'Duplicate email':
          changeIsDuplicateToTrue(setEmail);
          break;
        default:
          console.log(
            "Apologies, but it seems like something went wrong on our end. We'll work to fix the issue as soon as possible. Please try again later. Thank you for your understanding."
          );
      }
    }
  }

  // call the function when isDuplicate state key needs to be changed to TRUE for any state
  function changeIsDuplicateToTrue(setState) {
    setState((otherValues) => ({
      ...otherValues,
      isDuplicate: true,
    }));
  }

  // call the function when isDuplicate state key needs to be changed to FALSE for any state
  function changeIsDuplicateToFalse(setState) {
    setState((otherValues) => ({
      ...otherValues,
      isDuplicate: false,
    }));
  }

  // set a new value to the state.value associated to the text field that invokes this function
  function handleOnChange(inputValue, setState) {
    setState((otherValues) => ({
      ...otherValues,
      value: inputValue,
    }));
  }

  // verify that the input is both non-blank and matches the regex pattern;
  // compare that password values
  // set the associated state to display the appropriate error message based on the validation result
  function handleOnBlur(inputValue, state, setState) {
    // ensure that the input is not empty
    if (isEmptyInput(inputValue)) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: true,
      }));
      return;
    }

    // if values length of both password and confirmPassword fields !== 0, ensure they
    // match; otherwise, change state to display corresponding error message
    if (!isEmptyInput(password.value) && !isEmptyInput(confirmPassword.value)) {
      if (password.value !== confirmPassword.value) {
        setConfirmPassword((otherValues) => ({
          ...otherValues,
          isMatch: false,
        }));
      }
      return;
    }

    // validate whether the input conforms to the regex pattern
    if (!validateInput(inputValue, state)) {
      setState((otherValues) => ({
        ...otherValues,
        isValid: false,
      }));
    }
  }

  // update the state to clear the error when the user focuses on that field
  function handleOnFocus(state, setState) {
    // change state to remove the error message on Focus if previously input was empty
    if (state.isEmpty) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: false,
      }));
      return;
    }

    // change state to remove the error message on Focus if previously input didn't pass the validation
    if (!state.isValid) {
      setState((otherValues) => ({
        ...otherValues,
        isValid: true,
      }));
    }
    // change state to remove the error message on Focus if previously provided password values didn't match
    if (!confirmPassword.isMatch) {
      setConfirmPassword((otherValues) => ({
        ...otherValues,
        isMatch: true,
      }));
    }

    // change state to remove the error message on Focus if previously provided userName or email values were duplicates in the DB
    if (state.isDuplicate) {
      changeIsDuplicateToFalse(setState);
    }
  }

  // console.log('value ' + password.value);
  // console.log('value ' + confirmPassword.value);
  // console.log('isEmpty ' + confirmPassword.isEmpty);
  // console.log('isValid ' + confirmPassword.isValid);
  // console.log('isMatch ' + confirmPassword.isMatch);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component='main'
        maxWidth='xs'
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h5'
          >
            Sign up
          </Typography>
          <Typography
            component='h2'
            variant='h6'
            textAlign='center'
            marginTop='1em'
          >
            And unlock limitless learning with Learnify's full access
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id='userName'
                  name='userName'
                  label='Username'
                  autoComplete='username'
                  onChange={(e) =>
                    handleOnChange(e.target.value.trim(), setUserName)
                  }
                  onBlur={(e) =>
                    handleOnBlur(e.target.value, e.target.id, setUserName)
                  }
                  error={
                    userName.isEmpty ||
                    !userName.isValid ||
                    userName.isDuplicate
                  }
                  helperText={
                    (userName.isEmpty && 'Username field is required') ||
                    (!userName.isValid && notValidUserNameErrorMessage) ||
                    (userName.isDuplicate &&
                      "The username address you've provided is already in use!")
                  }
                  onFocus={() => handleOnFocus(userName, setUserName)}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id='email'
                  name='email'
                  label='Email Address'
                  autoComplete='email'
                  onChange={(e) =>
                    handleOnChange(e.target.value.trim(), setEmail)
                  }
                  onBlur={(e) =>
                    handleOnBlur(e.target.value, e.target.id, setEmail)
                  }
                  error={!email.isValid || email.isEmpty || email.isDuplicate}
                  helperText={
                    (email.isEmpty && 'Email field is required') ||
                    (!email.isValid &&
                      'Kindly provide a legitimate email address') ||
                    (email.isDuplicate &&
                      "The email you've provided is already in use!")
                  }
                  onFocus={() => handleOnFocus(email, setEmail)}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                  autoComplete='new-password'
                  onChange={(e) =>
                    handleOnChange(e.target.value.trim(), setPassword)
                  }
                  onBlur={(e) =>
                    handleOnBlur(e.target.value, e.target.id, setPassword)
                  }
                  error={password.isEmpty || !password.isValid}
                  helperText={
                    (password.isEmpty && 'Password field is required') ||
                    (!password.isValid && notValidPasswordErrorMessage)
                  }
                  onFocus={() => handleOnFocus(password, setPassword)}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id='confirmPassword'
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  autoComplete='new-password'
                  onChange={(e) =>
                    handleOnChange(e.target.value.trim(), setConfirmPassword)
                  }
                  onBlur={(e) =>
                    handleOnBlur(
                      e.target.value,
                      e.target.id,
                      setConfirmPassword
                    )
                  }
                  error={
                    confirmPassword.isEmpty ||
                    !confirmPassword.isValid ||
                    !confirmPassword.isMatch
                  }
                  helperText={
                    (confirmPassword.isEmpty &&
                      'Confirm-Password field is required') ||
                    (!confirmPassword.isValid &&
                      notValidPasswordErrorMessage) ||
                    (!confirmPassword.isMatch && 'Passwords do not match')
                  }
                  onFocus={() =>
                    handleOnFocus(confirmPassword, setConfirmPassword)
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value='allowExtraEmails'
                      color='primary'
                    />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent='flex-end'
            >
              <Grid item>
                <Link
                  to='/signin'
                  className='externalLink'
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
