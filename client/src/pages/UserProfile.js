// React imports
import { React, useEffect, useState } from 'react';
import { ResetPassword } from '../components';

// Material UI imports
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

// Imports for interacting with the db
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries/userQueries';
import { UPDATE_USER_PROFILE } from '../utils/mutations/userMutations';

// Other utility imports
import { isEmptyInput, validateInput } from '../utils/validation';
import auth from '../utils/auth';

export function UserProfile() {
  //check login status
  if(!auth.loggedIn()) {
    window.location.assign('/signin');
  };

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();


  // Get the logged in user's information and set state with it
  const { loading, error: getUserError, data } = useQuery(GET_USER, {
    onCompleted: data => {
      let user = data.me;
      setUserName(user.username);
      setEmail(user.email);
    }
  });
  const user = data?.me || {};
  console.log('user', user);


  // Set up mutation to update the profile in the db
  const [updateUserProfile, { error: updateError }] = useMutation(UPDATE_USER_PROFILE);

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

    if(isEmptyInput(userName) || isEmptyInput(email)) {
      console.log('empty input');
      return;
    }

    if(auth.loggedIn()) {
      console.log('logged in');
    }

    const variables = {};
    variables.id = user._id;

    if (userName !== user.username) {
      if(validateInput(userName, 'userName')) {
        variables.username = userName;
      } else {
        console.log('invalid username');
        return;
      }
    }

    if (email !== user.email) {
      if(validateInput(email, 'email')) {
        variables.email = email;
      } else {
        console.log('invalid email');
        return;
      }
    }
    console.log(variables);

    if (variables.username || variables.email) {
      try {
        const updatedUser = await updateUserProfile({variables});
        console.log('updatedUser', updatedUser);
        setMessage('Profile updated successfully');
      } catch (error) {
        console.log(`Error updating profile: ${error}`);
        setMessage(`Error updating profile: ${error}`);
      }
    }
  }

  return (
    <div>
      <Typography component='h1' variant='h5'>
        My Profile
      </Typography>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <Box>
          <Typography component='h2' variant='h6'>
            Password
          </Typography>
          <ResetPassword textInput={'Reset Password'} email={email} />
        </Box>
        <TextField
          fullWidth
          id='userName'
          name='userName'
          label='Username'
          value={userName}
          onChange={(e) =>
            setUserName(e.target.value.trim())
          }
        />
        <br />
        <TextField
          fullWidth
          id='email'
          name='email'
          label='Email Address'
          value={email}
          onChange={(e) =>
            setEmail(e.target.value.trim())
          }
        />
        <Button
          type='submit'
          variant='contained'
        >
          Save
        </Button>
        {message && <p>{message}</p>}
      </Box>
    </div>
  );
}

export default UserProfile;
