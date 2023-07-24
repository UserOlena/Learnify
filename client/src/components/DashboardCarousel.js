import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DashboardCard } from '../components';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    display: 'flex',
    margin: '2em !important',
  },

  reactMultiCarouselTrack: {
    padding: '4rem 0 0 0 !important',
    margin: '1em !important',
  },

  carouselItem: {
    width: '16rem !important',
    margin: '0 1em 1.5em 0',
    display: 'block',
    height: 'inherit',
  },
}));

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
      infinite={true}
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
    >
      {props.items.map(
        ({ id, overview, thumbnail, title, averageRating, teacher }, index) => {
          return (
            <DashboardCard 
              index={index}
              id={id}
              thumbnail={thumbnail}
              title={title}
              teacher={teacher}
              averageRating={averageRating}
              size={props.size}
            />
          );
        }
      )}
    </Carousel>
  );
}

export default DashboardCarousel;
