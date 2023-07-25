import { React, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import { isEmptyInput } from '../utils/validation';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations/userMutations';
import Auth from '../utils/auth';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <a
        target='_blank'
        color='inherit'
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

export function SignIn() {
  const inputDefaultValues = {
    value: '',
    isEmpty: false,
    isVerifiedInput: true,
  };

  const [email, setEmail] = useState(inputDefaultValues);
  const [password, setPassword] = useState(inputDefaultValues);
  const [verifyInput, setVerifyInput] = useState(inputDefaultValues);

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const wrongInputErrorMessage =
    'Sorry, the combination of the email and password you provided does not match our records. Please double-check your credentials and try again.';

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      const { data } = await login({
        variables: {
          email: email.value,
          password: password.value,
        },
      });

      Auth.login(data.login.token);
      console.log('user logged in');
    } catch (err) {
      console.log(err.graphQLErrors[0].message);
      switch (err.graphQLErrors[0].message) {
        case 'No email found!':
        case 'Incorrect Password!':
          console.log('switch works');
          changeIsVerifiedInputToFalse(setVerifyInput);
          break;
        default:
          console.log(
            "Apologies, but it seems like something went wrong on our end. We'll work to fix the issue as soon as possible. Please try again later. Thank you for your understanding."
          );
      }
    }
  }

  // call the function when isVerifiedInput state key needs to be changed to FALSE for any state
  function changeIsVerifiedInputToFalse(setState) {
    setState((otherValues) => ({
      ...otherValues,
      isVerifiedInput: false,
    }));
  }

  // call the function when isVerifiedInput state key needs to be changed to FALSE for any state
  function changeIsVerifiedInputToTrue(setState) {
    setState((otherValues) => ({
      ...otherValues,
      isVerifiedInput: true,
    }));
  }  

  // set a new value to the state.value associated to the text field that invokes this function
  function handleOnChange(inputValue, setState) {
    setState((otherValues) => ({
      ...otherValues,
      value: inputValue,
    }));
  }

  // verify that the input is non-blank
  // set the associated state to display the appropriate error message based on the validation result
  function handleOnBlur(inputValue, setState) {
    // ensure that the input is not empty
    if (isEmptyInput(inputValue)) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: true,
      }));
      return;
    }
  }

  // update the state to clear the error when the user focuses on that field
  function handleOnFocus(state, setState) {
    // change state to remove the error message on Focus if previously provided input was empty
    if (state.isEmpty) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: false,
      }));
      return;
    }

    // change state to remove the error message on Focus if previously provided input was wrong
    if (!verifyInput.isVerifiedInput) {
      changeIsVerifiedInputToTrue(setVerifyInput);
    }
  }

  // console.log('password ' + password.value);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component='main'
        sx={{ height: '100vh' }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                required
                fullWidth
                id='email'
                name='email'
                label='Email Address'
                autoComplete='email'
                margin='normal'
                onChange={(e) =>
                  handleOnChange(e.target.value.trim(), setEmail)
                }
                onBlur={(e) => handleOnBlur(e.target.value, setEmail)}
                error={email.isEmpty || !verifyInput.isVerifiedInput}
                helperText={email.isEmpty && 'Email field is required'}
                onFocus={() => handleOnFocus(email, setEmail)}
              />
              <TextField
                required
                fullWidth
                id='password'
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                margin='normal'
                onChange={(e) =>
                  handleOnChange(e.target.value.trim(), setPassword)
                }
                onBlur={(e) => handleOnBlur(e.target.value, setPassword)}
                error={password.isEmpty || !verifyInput.isVerifiedInput}
                helperText={
                  (password.isEmpty && 'Password field is required') ||
                  (!verifyInput.isVerifiedInput && wrongInputErrorMessage)
                }
                onFocus={() => handleOnFocus(password, setPassword)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value='remember'
                    color='primary'
                  />
                }
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid
                  item
                  xs
                >
                  <Link
                    to='#'
                    className='externalLink'
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to='/signup'
                    className='externalLink'
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
