import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';
import { HalfRating } from '../components';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_FAVORITE_TO_USER } from '../utils/mutations/userMutations';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'var(--main-bg-color) !important',
    boxShadow: 'none !important',
    textAlign: 'left',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      margin: '1em 0',
    },
  },

  cardContent: {
    fontSize: 'calc(16px + (2 * ((100vw - 600px) / (1200 - 600))))',
    backgroundColor: 'var(--main-bg-color)',
    padding: '0 !important',
  },

  imgContainer: {
    [theme.breakpoints.down('sm')]: {
      height: '30vh',
    },
  },

  img: {
    height: '9em',
    border: 'solid 1px #d1d7dc',
    [theme.breakpoints.down('sm')]: {
      height: '80%',
    },
  },

  descriptionBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between !important',
    margin: 'auto 0',
  },

  p: {
    margin: '1rem 0 0 0',
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
    marginRight: '1rem !important',
  },

  learnMoreBtn: {
    color: 'rgba(0, 0, 0, 0.8) !important',
  },

  teacher: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: '0.8em',
    margin: '0.7em 0 0 0',
    textShadow: 'none',
  },
}));

export function DashboardCard(props) {
  const classes = useStyles();

  const [favoriteBorderIcon, setFavoriteBorderIcon] = useState(true);
  const [favoriteFilledIcon, setFavoriteFilledIcon] = useState(false);

  // Set up mutation to add the favorite tutorial to the user favorites array
  const [addFavoritetoUser, { error }] = useMutation(ADD_FAVORITE_TO_USER);

  async function addFavoriteTutorial(id, tutorialId) {
    try {
      const { data } = await addFavoritetoUser({
        variables: {
          id: '64be2bc6c54ba8ac9405b6e1',
          tutorialId: tutorialId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleFavoriteIconClick(tutorialId) {
    const result = addFavoriteTutorial('', tutorialId);
    if (result) {
      fillFavoriteIcon();
    }
  }

  function fillFavoriteIcon() {
    setFavoriteFilledIcon(true);
  }

  return (
    <Card
      value={props.id}
      className={`${classes.card} `}
    >
      <div className={`${classes.imgContainer}`}>
        <CardMedia
          component='img'
          alt='tutorial image'
          image={props.thumbnail}
          className={`${classes.img}`}
        />
        <CardContent className={`${classes.cardContent}`}>
          <p className={`${classes.p}`}>{props.title}</p>
        </CardContent>
      </div>
      <div>
        <p className={`${classes.teacher}`}>{props.teacher[0].username}</p>
        <HalfRating rating={props.averageRating} />
        <CardActions className={`${classes.cardContent} ${classes.actionBox}`}>
          <Button
            size='small'
            className={`${classes.learnMoreBtn}`}
          >
            Learn More
          </Button>

          {favoriteBorderIcon && (
            <IconButton
              aria-label='add to favorites'
              className={`${classes.favoriteIcon}`}
              value={props.id}
              onClick={(e) =>
                handleFavoriteIconClick(e.currentTarget.value)
              }
            >
              <FavoriteBorderIcon
                fontSize='large'
                color='error'
              />
            </IconButton>
          )}
          {favoriteFilledIcon && (
            <IconButton
              aria-label='add to favorites'
              className={`${classes.favoriteIcon}`}
            >
              <FavoriteIcon
                fontSize='large'
                color='error'
                value={props.id}
              />
            </IconButton>
          )}
        </CardActions>
      </div>
    </Card>
  );
}

export default DashboardCard;
