import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Material UI imports
import {
  Box,
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';

import { Rating } from '@material-ui/lab';

// Imports for interacting with the db
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations/reviewMutations';
import { GET_TUTORIAL } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';

// Imports for other utilities
import { isEmptyInput } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
  card: {
    background: 'inherit',
  },
  button: {
    float: 'right',
  },
}));

export function CommentForm() {
  const classes = useStyles();
  // Set default state values
  const inputDefaultValues = {
    value: '',
    isEmpty: false,
    isValid: true,
  };

  //State variables
  const [comment, setComment] = useState(inputDefaultValues);
  const [loggedOut, setLoggedOut] = useState(false);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);

  // Get tutorial ID from URL wildcard
  const { tutorialId } = useParams();

  // Set up mutation to add the review to the db
  // Use the cache to add each new review to the bottom of the card upon saving
  const [addReview, { error: reviewError }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { tutorial } = cache.readQuery({
          query: GET_TUTORIAL,
          variables: { tutorialId },
        });
        const { reviews } = tutorial;

        cache.writeQuery({
          query: GET_TUTORIAL,
          variables: { tutorialId },
          data: {
            tutorial: {
              ...tutorial,
              reviews: [...reviews, addReview],
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Get the logged in user's information
  const { data: userData } = useQuery(GET_USER);

  let user;
  if (userData) {
    user = userData.me;
  }
  // When form is submitted, add the review to the db
  async function handleSubmit(e) {
    e.preventDefault();
    // If user is not logged in, set state to show error and exit submit function
    if (!user) {
      setLoggedOut(true);
      return;
    }
    if (value === 0) {
      alert('Please provide both a rating and a comment');
      return;
    }

    const variables = {
      tutorialId,
      reviewer: user._id,
      rating: value,
      comment: comment.value,
    };
    try {
      await addReview({ variables });
      console.log(variables);
      // Reset comment form field after successful submission
      resetFormFields(setComment);
    } catch (error) {
      console.log(error);
    }
  }
  // set a new value to the state.value associated to the comment field
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

  // update the state to clear the error when the user focuses on comment field
  function handleOnFocus(state, setState) {
    // change state to remove the error message on Focus if previously input was empty
    if (state.isEmpty) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: false,
      }));
      return;
    }
  }

  // Function to reset the form fields to their default values
  function resetFormFields(setState) {
    setState((otherValues) => ({
      ...otherValues,
      value: '',
    }));
  }

  return (
    <Card
      className={classes.card}
      elevation={0}
    >
      <form>
        <Box
          component='div'
          mt={3}
          mb={1}
          borderColor='transparent'
          display='flex'
          justifyContent='center'
          flexWrap='wrap'
        >
          <Typography style={{ marginRight: '3%' }}>
            Rate this tutorial:
          </Typography>
          <Rating
            name='simple-controlled'
            required
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
        </Box>
        <TextField
          required
          fullWidth
          multiline
          minRows={4}
          style={{ marginTop: 0 }}
          variant='outlined'
          id='comment'
          name='comment'
          value={comment.value}
          label='Comment'
          margin='normal'
          onChange={(e) => handleOnChange(e.target.value, setComment)}
          onBlur={(e) => handleOnBlur(e.target.value, setComment)}
          error={comment.isEmpty}
          helperText={comment.isEmpty && 'Please enter a comment'}
          onFocus={() => handleOnFocus(comment, setComment)}
        />
        {loggedOut && (
          <Typography
            color='error'
            component='p'
            style={{marginRight:'3%'}}
          >
            You must be signed in to submit a comment.{' '}
            <Link to='/signin'>Sign In</Link>
          </Typography>
        )}
        <Button
          variant='contained'
          aria-label='submit'
          className={classes.button}
          endIcon={<SendRounded />}
          onClick={handleSubmit}
          style={{
            backgroundColor: '#92b4d4',
          }}
        >
          {' '}
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default CommentForm;
