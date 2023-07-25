import { React, useState, useEffect } from 'react';
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
import { ADD_FAVORITE_TO_USER, REMOVE_FAVORITE_FROM_USER } from '../utils/mutations/userMutations';
import { GET_USER } from '../utils/queries/userQueries';

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

  const [loggedOut, setLoggedOut] = useState(false);
  const [favoriteBorderIcon, setFavoriteBorderIcon] = useState(true);
  const [favoriteFilledIcon, setFavoriteFilledIcon] = useState(false);

  // Set up mutation to add the favorite tutorial to the user favorites array
  const [addFavoritetoUser, { error: addFavoriteError }] = useMutation(ADD_FAVORITE_TO_USER);
  const [removeFavoritefromUser, { error: removeFavoriteError }] = useMutation(REMOVE_FAVORITE_FROM_USER);

  // Get the logged in user's information
  const { data: userData } = useQuery(GET_USER);

   // Redirect to the Sign In page if user is not logged in
  function checkIfLoggedIn() {
    let user;
    if (userData) {
      user = userData.me;
    }
    console.log('user me')
    console.log(user)

    // If user is not logged in, set state to redirect to the Sign In page
    // otherwise sends User's ID back to fave the favorite tutorial
    if (!user) {
      window.location.assign(`/signin`);
      setLoggedOut(true);
      return;
    } else {
      console.log('logged user')
      console.log(user?._id)
      return user?._id
    }
  }

  // Function sends clicked tutorial ID and User ID to save it in the favorites array
  // Triggers Icons state to swithch between bordered to filled
  async function addFavoriteTutorialOnClick(tutorialId) {
    const userId = checkIfLoggedIn();

    try {
      const result = await addFavoritetoUser({
        variables: {
          id: userId,
          tutorialId: tutorialId,
        },
      });

      console.log('after favorite saved');
      console.log(result?.data?.addFavoritetoUser?._id);

      if (result?.data?.addFavoritetoUser?._id) {
        setFilledFavoriteIcon();
      } else {
        console.log('problem saving a favorite')
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function deletes favorite from the user's favorites array
  async function removeFavoriteTutorialOnClick(tutorialId) {
    const userId = checkIfLoggedIn();

    try {
      const result = await removeFavoritefromUser({
        variables: {
          id: userId,
          tutorialId: tutorialId,
        },
      });

      console.log('after favorite was deleted');
      console.log(result?.data?.removeFavoritefromUser?._id);

      if (result?.data?.removeFavoritefromUser?._id) {
        setBorderedFavoriteIcon();
      } else {
        console.log('problem saving a favorite')
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function cahnges favorite Icons state to replase filled with bordered one
  function setBorderedFavoriteIcon() {
    setFavoriteFilledIcon(false);
    setFavoriteBorderIcon(true)
  }

  // Function changes favorite Icons state to replase bordered with filled one
  function setFilledFavoriteIcon() {
    setFavoriteFilledIcon(true);
    setFavoriteBorderIcon(false)
  }




  useEffect(() => {
    const userFavorites = userData?.me?.favorites;
    console.log('userfavorites')
    console.log(userFavorites)
    const tutorialId = props.id;
    console.log('tutorial id')
    console.log(tutorialId)

    checkIfTutorialIsFavorite(userFavorites)

    // When the component mounts, check if each tutorial is in the user's favorites
    // const isFavorite = checkIfTutorialIsFavorite(userId, tutorialId);


  }, [props.id, userData]);




  async function checkIfTutorialIsFavorite(userFavorites) {

      userFavorites.map(tutorialId => {
        console.log(tutorialId)
          if (tutorialId) {

        }
      })


    // try {
      // Make query to fetch the user by ID and check if the tutorialId exists in their favoriteTutorials array
      // const { data } = await client.query({
      //   query: GET_USER, // Query to fetch the user by ID
      //   variables: { id: userId },
      // });
  
      // const user = data.getUser;
  
      // If the user exists and the tutorialId is present in their favoriteTutorials array, return true
    //   if (user && user.favoriteTutorials.includes(tutorialId)) {
    //     return true;
    //   }
  
    //   return false;
    // } catch (error) {
    //   console.log(error);
    //   return false; // In case of any errors or if the user is not found, assume the tutorial is not a favorite
    // }
  const userId = checkIfLoggedIn()

  
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
                addFavoriteTutorialOnClick(e.currentTarget.value)
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
              value={props.id}
              onClick={(e) =>
                removeFavoriteTutorialOnClick(e.currentTarget.value)
              }
            >
              <FavoriteIcon
                fontSize='large'
                color='error'
              />
            </IconButton>
          )}
        </CardActions>
      </div>
    </Card>
  );
}

export default DashboardCard;
