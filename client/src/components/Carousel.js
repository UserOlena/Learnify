import { React, useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  useTheme,
  IconButton,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#92b4d4',
  },
  cardImage: {
    width: '100%',
    objectFit: 'cover',
  },
  carouselArrows: {
    margin: theme.spacing(2),
  },
  arrowButton: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1),
    color: 'black',
  },
}));

export function Carousel() {
  const classes = useStyles();
  const theme = useTheme();

  const items = [
    {
      title: 'Welcome to Learnify!',
      description: 'Your learning journey starts here!',
      image:
        'https://c0.wallpaperflare.com/preview/272/750/376/business-laptop-office-computer.jpg',
    },
    {
      title: 'Tutorials',
      description:
        'Learnify contains a wide range of tutorials for you to learn from!',
      image:
        'https://c1.wallpaperflare.com/preview/427/745/192/notebook-natural-laptop-macbook.jpg',
    },
    {
      title: 'Recommendations',
      description: 'Below you will find recommendations to learn from!',
      image:
        'https://c1.wallpaperflare.com/preview/811/367/789/technology-computer-creative-design-thumbnail.jpg',
    },
    {
      title: 'Sign In',
      description: 'Sign in or sign up to start your learning journey!',
      image:
        'https://c1.wallpaperflare.com/preview/623/487/747/technology-code-coding-computer.jpg',
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null); // Create a ref to store the timer

  // Define the timer function separately
  function startTimer() {
    return setInterval(function () {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
  }

  useEffect(
    function () {
      // Start the initial timer
      timerRef.current = startTimer();

      return function () {
        clearInterval(timerRef.current);
      };
    },
    [items.length]
  );

  function handlePrev() {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? items.length - 1 : prevIndex - 1;
      return newIndex;
    });
  }

  function handleNext() {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % items.length;
      return newIndex;
    });
  }

  useEffect(
    function () {
      // Clear and restart the timer every time activeIndex changes
      clearInterval(timerRef.current);
      timerRef.current = startTimer();
    },
    [activeIndex]
  );

  return (
    <Grid
      container
      justifyContent='center'
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant='h3'
          gutterBottom
          style={{ textWeight: 'bold', marginTop: '5%' }}
        >
          Learnify
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        alignItems='center'
      >
        {items.map(function (item, index) {
          return (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? 'active' : ''
              }`}
              style={{
                display: index === activeIndex ? 'block' : 'none',
              }}
            >
              <Card className={classes.card}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={classes.cardImage}
                />
                <CardContent>
                  <Typography
                    variant='h5'
                    component='h3'
                    gutterBottom
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </Grid>
      <Grid
        item
        xs={12}
        className={classes.carouselArrows}
      >
        <IconButton
          className={classes.arrowButton}
          color='primary'
          onClick={handlePrev}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          className={classes.arrowButton}
          color='primary'
          onClick={handleNext}
        >
          <ArrowForward />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Carousel;
