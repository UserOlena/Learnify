import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
  content: {
    backgroundColor: 'lightgray',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    color: 'black',
    maxWidth: '1300px',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '4px solid black',
      borderRadius: theme.spacing(3),
      userSelect: 'none',
    },
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
}));

export function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h4' gutterBottom>
          About Learnify!
        </Typography>
        <Typography variant='body1' gutterBottom>
          Welcome To Learnify! Our website is designed to allow all users to
          learn new skills and share their knowledge with others. We have a wide
          variety of tutorials and lessons available for you to choose from. You
          can also create your own tutorials and lessons to share with others.
          We hope you enjoy your time on our website!
        </Typography>
        <Typography variant='body1' gutterBottom>
          The best way to interact with our website it to create a user account.
          This will allow you to create your own tutorials and lessons. Already
          have an account? Then sign in and start learning!
        </Typography>
      </div>
    </div>
  );
}

export default About;
