import { React, useState, useEffect } from 'react';
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
      width: '400px',
      margin: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '2px solid black',
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
    },
  };
});

function Carousel() {
  const classes = useStyles();
  const theme = useTheme();

  const items = [
    {
      title: 'Item 1',
      description: 'Description for Item 1',
      image: 'item1.jpg',
    },
    {
      title: 'Item 2',
      description: 'Description for Item 2',
      image: 'item2.jpg',
    },
    {
      title: 'Item 3',
      description: 'Description for Item 3',
      image: 'item3.jpg',
    },
    {
      title: 'Item 4',
      description: 'Description for Item 4',
      image: 'item4.jpg',
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
      <h2>Carousel Component</h2>
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
