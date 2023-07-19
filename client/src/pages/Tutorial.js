import { React } from 'react';

import { Box, Card, Container, Grid, makeStyles, Typography } from '@material-ui/core';

import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

//TODO: GET_TITLE (line 32)
//TODO: GET_RATING (line 37)
//TODO: GET_TEACHER (line 39)
//TODO: GET_RUNTIME (line 40)

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
        <Rating name="read-only" value='{value}' readOnly />
        <Typography variant='subtitle1'># Ratings</Typography>
      </Box>
      <Box>
        <Typography variant='h4'>TeacherName</Typography>
        <Typography variant='h5'>Runtime: "value" </Typography>
      </Box>
    </Container>
  );
}
