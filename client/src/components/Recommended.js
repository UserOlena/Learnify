import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useQuery } from '@apollo/client';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { HalfRating } from '../components';

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'left',
    height: '100%',
    margin: theme.spacing(2),
  },
  cardTitle: {
    fontSize: 'calc(16px + (2 * ((100vw - 600px) / (1200 - 600))))',
    fontWeight: 'bold',
    padding: 2,
  },
  cardDescription: {
    padding: 2,
  },
  arrowButton: {
    padding: theme.spacing(1),
    color: 'black',
  },
  img: {
    height: '9em',
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
    <Container maxWidth>
      <Typography
        variant='h4'
        gutterBottom
      >
        Recommended Tutorials
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {visibleTutorials.map((tutorial) => (
          <>
          <Grid
            item
            xs={12}
            md={3} 
          >
            <Card
              key={tutorial._id}
              className={classes.card}
            >
              <CardActionArea>
              <CardMedia
                component='img'
                alt={tutorial.title}
                image={tutorial.thumbnail}
                className={`${classes.img}`}
              ></CardMedia>
              <CardContent style={{ padding: 2 }}>
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
                  {tutorial.teacher?.[0]?.username ?? 'Deleted user'}
                </Typography>
              </CardContent>
              <HalfRating rating={tutorial.averageRating} />
              </CardActionArea>
            </Card>
          </Grid>
          </>
        ))}
      </Grid>

      {/* Render the arrow buttons only if the screen is full screen */}
      {isFullScreen && (
        <Grid
          item
          xs={12}
          style={{ marginTop: theme.spacing(2) }}
        >
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
    </Container>
  );
}

export default Recommended;
