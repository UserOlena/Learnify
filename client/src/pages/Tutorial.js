import { React } from 'react';

import { Navbar, Footer } from '../components';

import { Card, Container, Grid, Typography } from '@material-ui/core';

import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

//TODO: Add function to get runtime of tutorial (for line 37)

export function Tutorial() {
  const classes = useStyles();

  return (
    <Container maxWidth='sm'>
        <Typography
          variant='h1'
          style={{
            color: '#283845',
            fontWeight: 'bold'
          }}
        >
          Tutorial Title
        </Typography>
        <Box>
        <Rating name="read-only" value={value} readOnly />
        <Typography variant='subtitle1'># Ratings</Typography>
      </Box>
      <Box>
        <Typography variant='h4'>TeacherName</Typography>
        <Typography variant='h5'>Runtime: {value} </Typography>
      </Box>
    </Container>
  );
}
