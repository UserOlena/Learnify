import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  useTheme,
  IconButton,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    carousel: {
      textAlign: 'center',
      margin: theme.spacing(2, 0),
    },
    carouselContent: {
      display: 'flex',
      justifyContent: 'center',
    },
    card: {
      width: '800px',
      margin: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '2px solid black',
    },
    cardImage: {
      width: '100%',
      maxHeight: '300px',
      objectFit: 'cover',
    },
    carouselArrows: {
      margin: theme.spacing(2),
    },
    arrowButton: {
      margin: theme.spacing(0, 1),
      padding: theme.spacing(1),
      color: theme.palette.type === 'dark' ? 'white' : 'black',
    },
  };
});

function Carousel() {
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
        'Lernify contains a wide range of tutorials for you to learn from!',
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

  useEffect(
    function () {
      const timer = setInterval(function () {
        setActiveIndex(function (prevIndex) {
          return (prevIndex + 1) % items.length;
        });
      }, 5000);

      return function () {
        clearInterval(timer);
      };
    },
    [items.length]
  );

  function handlePrev() {
    setActiveIndex(function (prevIndex) {
      if (prevIndex === 0) {
        return items.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  }

  function handleNext() {
    setActiveIndex(function (prevIndex) {
      return (prevIndex + 1) % items.length;
    });
  }

  return (
    <div className={classes.carousel}>
      <h1>Learnify</h1>
      <div className={classes.carouselContent}>
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
                  <Typography variant='h5' component='h3' gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant='body1' component='p'>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      <div className={classes.carouselArrows}>
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
      </div>
    </div>
  );
}

export default Carousel;
