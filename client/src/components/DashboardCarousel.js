import { React, useState } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DashboardCard } from '../components';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex !important',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {},
  },

  carouselContainer: {
    display: 'flex',
    width: '95vw',
    margin: '0 2.5vw !important',
    maxWidth: '120em',
    alignSelf: 'center',
    boxShadow: '-9px -15px 10px -10px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      width: '95vw',
      margin: '2.5vw !important',
    },
  },

  reactMultiCarouselTrack: {
    padding: '4rem 0 0 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column !important',
      transform: 'none !important',
      padding: '0 !important',
      width: '95vw',
    },
  },

  carouselItem: {
    width: '16rem !important',
    margin: '0 1em 1.5em 0',
    display: 'block',
    height: 'inherit',
    [theme.breakpoints.down('sm')]: {
      margin: '0 2.5vw !important',
      width: '90vw !important',
      padding: '2em 0 0 0 !important',
    },
  },
}));

export function DashboardCarousel(props) {
  const classes = useStyles();

  const matchesMax959 = useMediaQuery('(max-width:959px)');

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

  const saved = props.items.filter(item => props.user.favorites.some(
    (favorite) => favorite._id === item._id
  ));

  return (
    <div className={`${classes.container}`}>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={matchesMax959 ? false : true}
        responsive={responsive}
        infinite={false}
        // autoPlay={true}
        autoPlaySpeed={4000}
        shouldResetAutoplay={true}
        keyBoardControl={true}
        transitionDuration={1000}
        additionalTransfrom={1}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass='custom-dot-list-style'
        containerClass={`'carousel-container' ${classes.carouselContainer}`}
        itemClass={`${classes.carouselItem}`}
        sliderClass={`${classes.reactMultiCarouselTrack}`}
        slidesToSlide={3}
        centerMode={true}
        // partialVisible={true}
      >
        {props.chosenTab == 'browse' &&
          props.items.map(
            (
              { _id, overview, thumbnail, title, averageRating, teacher },
              index
            ) => {
              // Check if user's favorite array includes current tutorial ID
              const isFavorite = props.user.favorites.some(
                (favorite) => favorite._id === _id
              );

              return (
                <DashboardCard
                  key={index}
                  index={index}
                  id={_id}
                  thumbnail={thumbnail}
                  title={title}
                  teacher={teacher}
                  averageRating={averageRating}
                  favorite={isFavorite}
                />
              );
            }
          )}
        {props.chosenTab == 'saved' &&
          saved.map(
            (
              { _id, overview, thumbnail, title, averageRating, teacher },
              index
            ) => {
              // Check if user's favorite array includes current tutorial ID


              return (
                <DashboardCard
                  key={index}
                  index={index}
                  id={_id}
                  thumbnail={thumbnail}
                  title={title}
                  teacher={teacher}
                  averageRating={averageRating}
                  favorite={true}
                />
              );
            }
          )}
      </Carousel>
    </div>
  );
}

export default DashboardCarousel;
