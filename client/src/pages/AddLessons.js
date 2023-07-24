// React / router imports
import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Material UI imports
import { Box, Button, TextField, Typography } from '@mui/material';
import { Chip, Divider, makeStyles } from '@material-ui/core';

// Imports for interacting with the db
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LESSON } from '../utils/mutations/lessonMutations';
import { GET_TUTORIAL } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';

// Imports for other utilities
import { isEmptyInput } from '../utils/validation';

// Component imports
import { ViewLesson } from '../components/ViewLesson';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3%',
  },
  title: {
    margin: '3%',
  },
  chip: {
    marginLeft: 8,
    marginRight: 8,
    ...theme.typography.button,
    backgroundColor: '#98b7f5',
    fontWeight: 'bold',
  },
}));

export function AddLessons() {
  const classes = useStyles();
  const stylesFromAddLesson = { marginBottom: '1rem' };
  const dividerStyles = { width: '90%', margin: '2rem auto' };

  // Set default state values
  const inputDefaultValues = {
    value: '',
    isEmpty: false,
    isValid: true,
  };

  const [name, setName] = useState(inputDefaultValues);
  const [body, setBody] = useState(inputDefaultValues);
  const [media, setMedia] = useState(inputDefaultValues);
  const [duration, setDuration] = useState(inputDefaultValues);
  const [success, setSuccess] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  // Set up mutation to add the lesson to the db
  // Use the cache to add each new lesson to the bottom of the page upon saving
  const [addLesson, { error: lessonError }] = useMutation(ADD_LESSON, {
    update(cache, { data: { addLesson } }) {
      try {
        const { tutorial } = cache.readQuery({
          query: GET_TUTORIAL,
          variables: { tutorialId },
        });
        const { lessons } = tutorial;

        cache.writeQuery({
          query: GET_TUTORIAL,
          variables: { tutorialId },
          data: {
            tutorial: {
              ...tutorial,
              lessons: [...lessons, addLesson],
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

  // Get tutorial ID from URL wildcard
  const { tutorialId } = useParams();

  // Set up query to get the tutorial from the db
  const { loading, error, data } = useQuery(GET_TUTORIAL, {
    variables: { tutorialId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const tutorial = data.tutorial;
  const { categories, lessons } = tutorial;

  //map categories array for rendering
  function categoryList(categories) {
    return (
      <>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.category}
            className={classes.chip}
          />
        ))}
      </>
    );
  }

  //map lessons array for rendering
  function lessonList(lessons) {
    return (
      <>
        {lessons.map((lesson) => (
          <ViewLesson
            key={lesson._id}
            lessonFromAddLessons={lesson}
            stylesFromAddLesson={stylesFromAddLesson}
          />
        ))}
      </>
    );
  }

  // When form is submitted, add the lesson to the db
  async function handleSubmit(e) {
    e.preventDefault();

    // If user is not logged in, set state to show error and exit submit function
    if (!user) {
      setLoggedOut(true);
      return;
    }

    const variables = {
      tutorialId,
      name: name.value,
      body: body.value,
      duration: parseInt(duration.value),
    };

    if (media.value) {
      variables.media = media.value;
    }

    try {
      await addLesson({ variables });

      setSuccess(true);

      // Reset all of the form fields after successful submission
      resetFormFields(setName);
      resetFormFields(setBody);
      resetFormFields(setMedia);
      resetFormFields(setDuration);
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

    // Remove successful save message
    if (success) {
      setSuccess(false);
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
    <div>
      <Typography component='h1' variant='h5' gutterBottom sx={{ mt: 4 }}>
        Add Lessons to Your Tutorial
      </Typography>
      <Typography
        component='p'
        gutterBottom
        sx={{ width: '80%', margin: '0 auto' }}
      >
        Fill out the fields below and click "Save Lesson" to add an individual
        lesson to your tutorial. Repeat as many times as needed. Each lesson
        will appear at the bottom of this page as you add it.
      </Typography>
      <Divider style={dividerStyles} />
      <Typography component='h2' variant='h6' gutterBottom>
        Tutorial Title: <b>{tutorial.title}</b>
      </Typography>
      <Box direction='row'>{categoryList(categories)}</Box>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          ml: 'auto',
          mr: 'auto',
          width: '80%',
          maxWidth: '800px',
        }}
      >
        <TextField
          required
          fullWidth
          id='name'
          name='name'
          value={name.value}
          label='Name'
          margin='normal'
          onChange={(e) => handleOnChange(e.target.value, setName)}
          onBlur={(e) => handleOnBlur(e.target.value, setName)}
          error={name.isEmpty}
          helperText={name.isEmpty && 'Please enter the name of this lesson'}
          onFocus={() => handleOnFocus(name, setName)}
        />
        <TextField
          required
          fullWidth
          id='body'
          name='body'
          value={body.value}
          label='Body'
          margin='normal'
          multiline
          minRows={3}
          onChange={(e) => handleOnChange(e.target.value, setBody)}
          onBlur={(e) => handleOnBlur(e.target.value, setBody)}
          error={body.isEmpty}
          helperText={body.isEmpty && 'Please enter the body of this lesson'}
          onFocus={() => handleOnFocus(body, setBody)}
        />
        <TextField
          fullWidth
          id='media'
          name='media'
          value={media.value}
          label='Media'
          margin='normal'
          onChange={(e) => handleOnChange(e.target.value, setMedia)}
        />
        <TextField
          required
          fullWidth
          id='duration'
          name='duration'
          value={duration.value}
          label='Duration (minutes)'
          margin='normal'
          onChange={(e) => handleOnChange(e.target.value, setDuration)}
          onBlur={(e) => handleOnBlur(e.target.value, setDuration)}
          error={duration.isEmpty}
          helperText={
            duration.isEmpty &&
            'Please enter the time to complete the process(es) in this lesson'
          }
          onFocus={() => handleOnFocus(duration, setDuration)}
        />
        {loggedOut && (
          <Typography color='error' component='p'>
            You must be signed in to add a lesson to a tutorial.{' '}
            <Link to='/signin'>Sign In</Link>
          </Typography>
        )}
        <Button type='submit' variant='contained' sx={{ mt: 3 }}>
          Save Lesson
        </Button>
        {success && (
          <Typography component='p' color='secondary' sx={{ mt: 3 }}>
            Your lesson has been saved! View it at the bottom of the list below.
          </Typography>
        )}
      </Box>
      <Divider style={dividerStyles} />
      <Typography
        component='h2'
        variant='h5'
        style={{
          margin: '2rem 0',
        }}
      >
        Lessons in This Tutorial
      </Typography>
      {lessons && lessons.length > 0 ? (
        lessonList(lessons)
      ) : (
        <p>No lessons yet! Add one above.</p>
      )}
    </div>
  );
}

export default AddLessons;
