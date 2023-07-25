import { React, useEffect, useState } from 'react';
import { ResetPassword, DeleteButton } from '../components';
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
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries/userQueries';
import { UPDATE_USER_PROFILE } from '../utils/mutations/userMutations';
import { isEmptyInput, validateInput } from '../utils/validation';
import auth from '../utils/auth';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '66%',
    margin: 'auto',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    border: '3px solid black',
    backgroundColor: '#92b4d4',
    userSelect: 'none',
  },
}));

export function UserProfile() {
  const classes = useStyles();
  //check login status
  if (!auth.loggedIn()) {
    window.location.assign('/signin');
  }

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  // Get the logged in user's information and set state with it
  const {
    loading,
    error: getUserError,
    data,
  } = useQuery(GET_USER, {
    onCompleted: (data) => {
      let user = data.me;
      setUserName(user.username);
      setEmail(user.email);
    },
  });
  const user = data?.me || {};
  console.log('user', user);

  // Set up mutation to update the profile in the db
  const [updateUserProfile, { error: updateError }] =
    useMutation(UPDATE_USER_PROFILE);

  if (loading) {
    return <p>Loading your profile...</p>;
  }
  if (getUserError) {
    return <p>Error loading your profile</p>;
  }
  if (updateError) {
    return <p>Error updating your profile</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isEmptyInput(userName) || isEmptyInput(email)) {
      console.log('empty input');
      return;
    }

    if (auth.loggedIn()) {
      console.log('logged in');
    }

    const variables = {};
    variables.id = user._id;

    if (userName !== user.username) {
      if (validateInput(userName, 'userName')) {
        variables.username = userName;
      } else {
        console.log('invalid username');
        return;
      }
    }

    if (email !== user.email) {
      if (validateInput(email, 'email')) {
        variables.email = email;
      } else {
        console.log('invalid email');
        return;
      }
    }
    console.log(variables);

    if (variables.username || variables.email) {
      try {
        const updatedUser = await updateUserProfile({ variables });
        console.log('updatedUser', updatedUser);
        setMessage('Profile updated successfully');
      } catch (error) {
        console.log(`Error updating profile: ${error}`);
        setMessage(`Error updating profile: ${error}`);
      }
    }
  }

  return (
    <Container component='div' className={classes.container}>
      <Typography component='h1' variant='h5'>
        My Profile
      </Typography>
      <Typography component='h1' variant='h6'>
        Update Account Information
      </Typography>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, '& > *': { mb: 3 } }}
      >
        <Box></Box>
        <TextField
          fullWidth
          id='userName'
          name='userName'
          label='Username'
          value={userName}
          onChange={(e) => setUserName(e.target.value.trim())}
        />
        <br />
        <TextField
          fullWidth
          id='email'
          name='email'
          label='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <Button type='submit' variant='contained'>
          Save New Username
        </Button>
        {message && <p>{message}</p>}
        <ResetPassword textInput={'Reset Account Password'} email={email} />
        <DeleteButton case={'user'} />
      </Box>
      <br />
      <Box sx={{ mt: 3 }}></Box>
    </Container>
  );
}

export default UserProfile;
