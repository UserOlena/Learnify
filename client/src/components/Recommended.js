import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useQuery } from '@apollo/client';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  recommendations: {
    margin: theme.spacing(2, 0),
  },
  recommendationsContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', // Switch to column layout on small screens
      margin: theme.spacing(0, 1),
    },
  },
  card: {
    backgroundColor: 'var(--main-bg-color) !important',
    textAlign: 'left',
    width: 'calc(25% - 10px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      margin: '1em 0',
    },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignContent: 'start'
  },
  cardDescription: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  recommendationsArrows: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
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
  const visibleTutorials = tutorials.slice(currentIndex, currentIndex + 4);

  function handlePrev() {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  }

  function handleNext() {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 4, tutorials.length - 4)
    );
  }

  return (
    <div className={classes.recommendations}>
      <h2>Recommendations For You!</h2>
      <Grid container className={classes.recommendationsContent}>
        {visibleTutorials.map((tutorial) => (
          <Card
            key={tutorial._id}
            className={classes.card}
            style={{
              border: `2px solid ${
                theme.palette.type === 'dark' ? 'white' : 'black'
              }`,
            }}
          >
            <CardMedia
            component='img'
            alt={tutorial.title}
            image={tutorial.thumbnail}
            className={`${classes.img}`}
            >
            </CardMedia>
            <CardContent>
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
          </Card>
        ))}
      </Grid>

      {/* Render the arrow buttons only if the screen is full screen */}
      {isFullScreen && (
        <div className={classes.recommendationsArrows}>
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
        </div>
      )}
    </div>
  );
}

export default Recommended;
