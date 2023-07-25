import React from 'react';
import {
  makeStyles,
  createMuiTheme,
  useMediaQuery,
} from '@material-ui/core';
import Logo from '../images/learnify-logo__1_-removebg.png';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    flexDirection: 'column', // Align content vertically
  },
  content: {
    backgroundColor: '#FAF0E6',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    color: 'black',
    position: 'relative',
    border: '4px solid black',
    borderRadius: theme.spacing(3),
    userSelect: 'none',
    marginBottom: theme.spacing(40),
  },
  logo: {
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(8),
    position: 'relative',
    // Add the following CSS to hide the logo when the screen is not full size
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
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

export function About2() {
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
      {/* Logo is now rendered separately */}
      <div className={classes.logo}>
        <img
          src={Logo}
          alt='Learnify Logo'
          style={{ width: '250px', height: '200px' }}
        />
      </div>
      {/* Content box is here */}
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

export default About2;