import { React, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isEmptyInput, validateInput } from '../utils/validation';

import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
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
      <Link
        color='inherit'
        href='https://github.com/UserOlena/Learnify/blob/main/LICENSE'
      >
        Learnify
      </Link>
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
  }

  const [userName, setUserName] = useState(inputDefaultValues);
  const [email, setEmail] = useState(inputDefaultValues);
  const [password, setPassword] = useState(inputDefaultValues);

  const handleSubmit = (e) => {
    e.preDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  }

  // set a new value to the state.value associated to the text field that invokes this function
  function handleOnChange(inputValue, setState) {
    setState((otherValues) => ({
      ...otherValues,
      value: inputValue,
    }));
  }

  // verify that the input is both non-blank and matches the regex pattern
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

    // validate whether the input conforms to the regex pattern
    if (!validateInput(inputValue, state)) {
      setState((otherValues) => ({
        ...otherValues,
        isValid: false,
      }));
    }
  }

  console.log('value ' + email.value);
  console.log('isEmpty ' + email.isEmpty);
  console.log('isValid ' + email.isValid);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
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
          <Typography component='h1' variant='h5'>
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
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
                  error={userName.isEmpty || !userName.isValid}
                  helperText={
                    (userName.isEmpty && 'Username field is required') ||
                    (!userName.isValid &&
                      'Username should consist of 4 to 12 alphanumeric characters.')
                  }
                />
              </Grid>
              <Grid item xs={12}>
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
                  error={!email.isValid || email.isEmpty}
                  helperText={
                    (email.isEmpty && 'Email field is required') ||
                    (!email.isValid &&
                      'Kindly provide a legitimate email address.')
                  }
                />
              </Grid>
              <Grid item xs={12}>
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
                    (!password.isValid &&
                      'Password should consist of at least one digit, one special character, one uppercase letter, and one lowercase letter and have 8 to 16 characters.')
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
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
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='#' variant='body2'>
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
