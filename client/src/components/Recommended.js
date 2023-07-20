import { React, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { gql, useQuery } from '@apollo/client';
import { QUERY_TUTORIALS } from '../utils/queries/tutorialQueries';

const useStyles = makeStyles((theme) => ({
  recommendations: {
    margin: theme.spacing(2, 0),
  },
  recommendationsContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: 'calc(25% - 10px)',
    marginBottom: theme.spacing(2),
    border: `2px solid ${theme.palette.type === 'dark' ? 'white' : 'black'}`,
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
    color: theme.palette.type === 'dark' ? 'white' : 'black',
  },
}));

function Recommended() {
  const classes = useStyles();
  const theme = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, data } = useQuery(QUERY_TUTORIALS);

  console.log(data);

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
              style={{ width: '100%' }}
            />
            <CardContent>
              <Typography className={classes.cardTitle}>
                {tutorial.title}
              </Typography>
              <Typography className={classes.cardDescription}>
                {tutorial.overview}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
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
    </div>
  );
}

export default Recommended;
