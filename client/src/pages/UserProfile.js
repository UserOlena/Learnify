// React imports
import { React, useEffect, useState } from 'react';

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

export function UserProfile() {
  let user;

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();

  // Get the logged in user's information and set state with it
  const { loading, error: getUserError, data } = useQuery(GET_USER, {
    onCompleted: data => {
      user = data.me;
      setUserName(user.username);
      setEmail(user.email);
    }
  });

  // Set up mutation to update the profile in the db
  const [updateUserProfile, { error: updateError }] = useMutation(UPDATE_USER_PROFILE);

  if (loading) {
    return <p>Loading your profile...</p>;
  }
  if (getUserError) {
    return <p>Error loading your profile</p>;
  }

  // function handleOnChange(e) {
  //   setUserName(e.target.value);
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log('userName', userName);
    console.log('email', email);

    // If user is not logged in, set state to show error and exit submit function
    if (!user) {
      // setLoggedOut(true);
      console.log('not logged in');
      return;
    }

    const variables = {};

    if (userName !== user.username) {
      variables.username = userName;
    }
    if (email !== user.email) {
      variables.email = email;
    }

    if (variables.username || variables.email) {
      try {
        const updatedUser = await updateUserProfile({ variables });
        console.log('updatedUser', updatedUser);
      } catch (error) {
        console.log(`Error updating profile: ${error}`);
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
          <Button
            variant='contained'
          >
            Change My Password
          </Button>
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
      </Box>
    </div>
  );
}

export default UserProfile;
