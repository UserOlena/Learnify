import { React } from 'react';
import { Typography } from '@mui/material';
import { AddLesson } from '../components';

export function AddLessons() {
  return (
    <div>
      <Typography component='h1' variant='h5'>
        Add Lessons to Your Tutorial
      </Typography>
      <AddLesson />
    </div>
  );
}

export default AddLessons;
