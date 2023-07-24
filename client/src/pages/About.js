import React from 'react';
import {
  makeStyles,
  createMuiTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
  content: {
    backgroundColor: '#FAF0E6',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    color: 'black',
    position: 'relative',
    overflow: 'hidden',
    border: '4px solid black', // Add the border directly here
    borderRadius: theme.spacing(3),
    userSelect: 'none',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
}));

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export function About() {
  const classes = useStyles();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  let maxWidth = 'sm';
  if (isLargeScreen) {
    maxWidth = 'lg';
  } else if (isMediumScreen) {
    maxWidth = 'md';
  }

  return (
    <Container className={classes.root} maxWidth={maxWidth}>
      <div className={classes.content}>
        <Typography variant='h4' gutterBottom>
          About Learnify!
        </Typography>
        <Typography variant='body1' gutterBottom>
          Welcome To Learnify! Our website is designed to allow all users to
          learn new skills and share their knowledge with others. We have a
          wide variety of tutorials and lessons available for you to choose
          from. You can also create your own tutorials and lessons to share
          with others. We hope you enjoy your time on our website!
        </Typography>
        <Typography variant='body1' gutterBottom>
          The best way to interact with our website is to{' '}
          <Link to='/signup'>create a user account</Link>. This will allow you to
          create your own tutorials and lessons. Already have an account? Then{' '}
          <Link to='/signin'>sign in and start learning</Link>!
        </Typography>
      </div>
    </Container>
  );
}

export default About;
