import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  pushLeft: {
    marginRight: '4rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },

  pushRight: {
    marginLeft: '4rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },

  overlap: {
    marginLeft: '16%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },

  projTitle: {
    textShadow: '1px 1px 2px #88039c',
    [theme.breakpoints.down('sm')]: {
      textShadow: '1px 1px 1px black',
      fontSize: 'calc(15px + (80 - 15) * ((100vw - 600px) / (1200 - 600)))',
    },
  },
  //   kghk

  carouselContainer: {
    display: 'flex',
  },

  reactMultiCarouselTrack: {
    padding: '4rem 0 0 0 !important',
  },

  carouselItem: {
    width: '16rem !important',
    margin: '0 1em 1em 0',
    display: 'block',
    height: 'inherit',
  },

  card: {
    backgroundColor: 'var(--main-bg-color) !important',
    boxShadow: 'none !important',
    textAlign: 'left',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  cardContent: {
    fontSize: 'calc(16px + (2 * ((100vw - 600px) / (1200 - 600))))',
    backgroundColor: 'var(--main-bg-color)',
    padding: '1em 0 1em 0 !important',
  },

  img: {
    height: '9em',
    border: 'solid 1px #d1d7dc',
  },

  descriptionBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between !important',
    margin: 'auto 0',
  },

  p: {
    margin: 0,
    fontWeight: 'bold',
    textShadow: '1px 1px 1px #cfccca',
  },

  actionBox: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    bottom: 0,
  },

  favoriteIcon: {
    marginRight: '1rem',
  },

  learnMoreBtn: {
    color: 'rgba(0, 0, 0, 0.8) !important',
  },
}));
import HalfRating from '../components';
export function DashboardCarousel(props) {
  const classes = useStyles();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      //   autoPlay={true}
      autoPlaySpeed={10000}
      shouldResetAutoplay={true}
      keyBoardControl={true}
      customTransition='all .5'
      transitionDuration={500}
      removeArrowOnDeviceType={['tablet', 'mobile']}
      // deviceType={this.props.deviceType}
      dotListClass='custom-dot-list-style'
      containerClass={`'carousel-container'`}
      itemClass={`${classes.carouselItem}`}
      sliderClass={`${classes.reactMultiCarouselTrack}`}
    >
      {props.items.map(({ id, overview, thumbnail, title }, index) => {
        return (
          <Card
            key={index}
            value={id}
            className={`${classes.card} `}
          >
            <div>
              <CardMedia
                component='img'
                alt='tutorial image'
                image={thumbnail}
                className={`${classes.img}`}
              />

              <CardContent className={`${classes.cardContent}`}>
                <p className={`${classes.p}`}>{title}</p>
              </CardContent>
            </div>
            <CardActions
              className={` ${classes.cardContent} ${classes.actionBox}`}
            >
              <Button
                size='small'
                className={`${classes.learnMoreBtn}`}
              >
                Learn More
              </Button>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon className={`${classes.favoriteIcon}`} />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </Carousel>
  );
}

export default DashboardCarousel;
