import { React, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { AddLesson } from '../components';

export function AddLessons() {
  let count = 1;
  const [lessonComponents, setLessonComponents] = useState([<AddLesson key={count} number={count}/>]); 

  function addAnotherLesson() {
    count++;
    setLessonComponents([...lessonComponents, <AddLesson key={count} number={count}/>]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TBD
  }

  return (
    <div>
      <Typography component='h1' variant='h5'>
        Add Lessons to Your Tutorial
      </Typography>
      {lessonComponents}
      <Button 
        onClick={addAnotherLesson}
        variant='contained' 
        sx={{ mt: 3, mb: 2 }}
      >
        Add Another Lesson
      </Button>
      <Button 
        type='submit' 
        variant='contained' 
        sx={{ mt: 3, mb: 2 }}
      >
        Submit All Lessons
      </Button>
    </div>
  );
}

export default AddLessons;