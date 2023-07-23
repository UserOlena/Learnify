// React / router imports
import { React, useState } from 'react';
import { useParams } from 'react-router-dom';

// Material UI imports
import { 
  Box,
  Button, 
  TextField, 
  Typography,
} from '@mui/material';
import { Chip, makeStyles } from '@material-ui/core';

// Imports for interacting with the db
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LESSON } from '../utils/mutations/lessonMutations';
import { GET_TUTORIAL } from '../utils/queries/tutorialQueries';

// Imports for other utilities
import { isEmptyInput } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3%',
  },
  title: {
    margin: '3%',
  },
  chip: {
    margin: 2,
    ...theme.typography.button,
    backgroundColor: '#98b7f5',
  },
}));

export function AddLessons() {
  const classes = useStyles();

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

  // Set up mutation to add the lesson to the db
  const [addLesson, { error: lessonError }] = useMutation(ADD_LESSON);

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
          <div>
            <p>Name: {lesson.name}</p>
            <p>Body: {lesson.body}</p>
            <p>Media: {lesson.media}</p>
            <p>Duration: {lesson.duration}</p>
          </div>
        ))}
      </>
    );
  }

  // When form is submitted, add the lesson to the db
  async function handleSubmit(e) {
    e.preventDefault();

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
      <Typography component='h1' variant='h5'>
        Add Lessons to Your Tutorial
      </Typography>
      <Typography component='h2' variant='h6'>
        Tutorial: {tutorial.title}
      </Typography>
      <Box direction='row'>{categoryList(categories)}</Box>
      <Box 
        component='form' 
        noValidate 
        onSubmit={handleSubmit} 
        sx={{ mt: 1 }}
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
          helperText={
            name.isEmpty && 'Please enter the name of this lesson'
          }
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
          onChange={(e) => handleOnChange(e.target.value, setBody)}
          onBlur={(e) => handleOnBlur(e.target.value, setBody)}
          error={body.isEmpty}
          helperText={
            body.isEmpty && 'Please enter the body of this lesson'
          }
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
            duration.isEmpty && 'Please enter the time to complete the process(es) in this lesson'
          }
          onFocus={() => handleOnFocus(duration, setDuration)}
        />
        <Button 
          type='submit' 
          variant='contained' 
          sx={{ mt: 3, mb: 2 }}
        >
          Save Lesson
        </Button>
      </Box>
      <Typography component='h2' variant='h6'>
        Lessons in This Tutorial
      </Typography>
      {
        lessons && lessons.length > 0 ? 
          <Box>{lessonList(lessons)}</Box> :
          <p>No lessons yet! Add one above.</p>
      }
    </div>
  );
}

export default AddLessons;
