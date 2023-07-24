import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Material UI imports
import clsx from 'clsx';
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';

// Imports for interacting with the db
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations/reviewMutations';
import { GET_TUTORIAL } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';

// Imports for other utilities
import { isEmptyInput } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
  card: {
    background: '#dae9f7',
    marginBottom: 10,
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
  //Is there a way to get the username from the logged-in information? do we have a context for a logged-in user?
  const [username, setUsername] = useState(inputDefaultValues);
  const [comment, setComment] = useState(inputDefaultValues);
  const [loggedOut, setLoggedOut] = useState(false);

  // Get tutorial ID from URL wildcard
  const { tutorialId } = useParams();

  // Set up mutation to add the lesson to the db
  // Use the cache to add each new lesson to the bottom of the page upon saving
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
  // When form is submitted, add the tutorial to the db
  async function handleSubmit(e) {
    e.preventDefault();
    // If user is not logged in, set state to show error and exit submit function
    if (!user) {
      setLoggedOut(true);
      return;
    }

    const variables = {
      tutorialId,
      reviewer: user._id,
      comment: comment.value,
    };
    try {
      await addReview({ variables });
      console.log(variables);
      // Reset all of the form fields after successful submission
      resetFormFields(setComment);
    } catch (error) {
      console.log(error);
    }
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
        <TextField
          required
          fullWidth
          multiline
          minRows={4}
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
          >
            You must be signed in to submit a comment.
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
