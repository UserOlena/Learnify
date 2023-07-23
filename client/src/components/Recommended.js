import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
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
    width: 'calc(25% - 10px)',
    marginBottom: theme.spacing(2),
    border: `2px solid ${theme.palette.type === 'black'}`,
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Set the width to 100% on small screens to make cards stack vertically
    },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
}));

function Recommended() {
  const classes = useStyles();
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up('md')); // Check if screen is full screen (md breakpoint)

  //STATE management
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, err, data } = useQuery(GET_TUTORIALS);

  console.log(loading, err, data);

  if (loading) {
    return <p>Loading...</p>;
  }

  const tutorials = data.tutorials;
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
      <div className={classes.recommendationsContent}>
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
            <img
              src={tutorial.thumbnail}
              alt={tutorial.title}
              style={{ width: '100%', height: '200px' }} // Set a fixed height for the images (adjust the height as needed)
            />
            <CardContent>
              <Link
                to={`/tutorial/${tutorial._id}`}
                key={tutorial._id}
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
      </div>
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
