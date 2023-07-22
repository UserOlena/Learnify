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
import '../style/DashboardCarousel.css';

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

  card: {
    boxShadow: 'none',
    textAlign: 'left',
  },

  cardContent: {
    fontSize: 'calc(16px + (2 * ((100vw - 600px) / (1200 - 600))))',
    backgroundColor: 'var(--main-bg-color)',
    padding: '1em 0 0 0 !important',
  },

  p: {
    margin: 0,
    fontWeight: 'bold',
    textShadow: '1px 1px 1px #999796',
  },

  actionBox: {
    display: 'flex',
    justifyContent: 'space-between',
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
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      //   autoPlay={true}
      autoPlaySpeed={10000}
      shouldResetAutoplay={true}
      keyBoardControl={true}
      customTransition='all .5'
      transitionDuration={500}
      containerClass='carousel-container'
      removeArrowOnDeviceType={['tablet', 'mobile']}
      // deviceType={this.props.deviceType}
      dotListClass='custom-dot-list-style'
      itemClass='carousel-item-padding-40-px'
    >
      {props.items.map(({ id, overview, thumbnail, title }, index) => {
        return (
          <Card
            key={index}
            value={id}
            sx={{
              maxWidth: 285,
              boxShadow: 'none',
            }}
            style={{}}
            className={`${classes.card}`}
          >
            <CardMedia
              component='img'
              alt=''
              height='180'
              image={thumbnail}
            />
            <CardContent className={`${classes.cardContent}`}>
              <p className={`${classes.p}`}>{title}</p>
            </CardContent>
            <CardActions className={` ${classes.cardContent}`}>
              <IconButton aria-label='add to favorites' >
                <FavoriteIcon />
              </IconButton>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        );
      })}
    </Carousel>
  );
}

export default DashboardCarousel;
