import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Container, Grid, Typography, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useQuery } from '@apollo/client';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { HalfRating } from '../components';

const useStyles = makeStyles((theme) => ({


  card: {
    backgroundColor: 'var(--main-bg-color) !important',
    textAlign: 'left',
    height: '100%',
 

  },
  cardTitle: {
    fontSize: 'calc(16px + (2 * ((100vw - 600px) / (1200 - 600))))',
    // backgroundColor: 'var(--main-bg-color)',
    fontWeight: 'bold',
    padding:0
  },


  arrowButton: {
    padding: theme.spacing(1),
    color: 'black',
  },
  img: {
    height: '9em',
    border: 'solid 1px #d1d7dc',
    [theme.breakpoints.down('sm')]: {
      height: '80%',
    },
  },


  // Add the new class definition for the link
  link: {
    color: 'black', // Set the link color to black by default
    textDecoration: 'none', // Remove the default underline

    // Define styles for hover state
    '&:hover': {
      color: 'blue', // Set the link color to blue on hover
      textDecoration: 'underline', // Add underline on hover
    },
  },
}));

export function Recommended() {
  const classes = useStyles();
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up('md')); // Check if screen is full screen (md breakpoint)

  // STATE management
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, err, data } = useQuery(GET_TUTORIALS);

  console.log(loading, err, data);

  if (loading) {
    return <p>Loading...</p>;
  }

  const tutorials = data?.tutorials || [];
  const visibleTutorials = tutorials.slice(currentIndex, currentIndex + 5);

  function handlePrev() {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  }

  function handleNext() {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 5, tutorials.length - 5)
    );
  }

  return (
    <Container maxWidth >
      <Typography variant='h4' gutterBottom>Recommended Tutorials</Typography>
      <Grid container justifyContent='space-around'>
        {visibleTutorials.map((tutorial) => (
          <Grid item xs={10} md={2}>
          <Card
            key={tutorial._id}
            className={classes.card}
            style={{
              
            }}
          >
            <CardMedia
            component='img'
            alt={tutorial.title}
            image={tutorial.thumbnail}
            className={`${classes.img}`}
            >
            </CardMedia>
            <CardContent style={{padding:0}}>
              <Link
                to={`/tutorial/${tutorial._id}`}
                key={tutorial._id}
                className={classes.link} // Add the new class here for the link
              >
                
                <Typography className={classes.cardTitle}>
                  {tutorial.title}
                </Typography>
              </Link>
              <Typography className={classes.cardDescription}>
                {tutorial.overview}
              </Typography>
            </CardContent>
            <HalfRating rating={tutorial.averageRating} />
          </Card>
          </Grid>
        ))}
      </Grid>


      {/* Render the arrow buttons only if the screen is full screen */}
      {isFullScreen && (
        <Grid item xs={12} style={{marginTop:theme.spacing(2)}}>
          <IconButton
            className={classes.arrowButton}
            color='primary'
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            className={classes.arrowButton}
            color='primary'
            disabled={currentIndex >= tutorials.length - 4}
            onClick={handleNext}
          >
            <ArrowForward />
          </IconButton>
        </Grid>
      )}
    </Container >
  );
}

export default Recommended;
