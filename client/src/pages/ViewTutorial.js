import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//import Learnify components
import {
  CommentForm,
  RateTutorial,
  ViewLesson,
  HalfRating,
} from '../components';

//Material-UI imports
import clsx from 'clsx';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  Bookmark,
  BookmarkBorder,
  ExpandMore,
  SkipPrevious,
  SkipNext,
  StarBorder,
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

//database-related imports
import { useQuery, useMutation } from '@apollo/client';
import { GET_TUTORIAL } from '../utils/queries/tutorialQueries';
import { ADD_REVIEW } from '../utils/mutations/reviewMutations';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3%',
  },
  button: {
    background: '#f7d148',
    '&:hover': { background: '#f2bf07' },
  },
  chip: {
    marginLeft: 8,
    marginRight: 8,
    ...theme.typography.button,
    backgroundColor: '#92b4d4',
    fontWeight: 'bold',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export function ViewTutorial() {
  const classes = useStyles();

  //get tutorialId from URL
  const { tutorialId } = useParams();
  console.log(tutorialId);

  //declare State variables
  const [expanded, setExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  //function to handle click on expand icon and update State
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //function to toggle visibility of lesson card container
  const toggleVisibility = () => {
    if (isHidden) {
      setIsHidden(!isHidden);
    } else {
      return;
    }
  };
  //function to bookmark a tutorial
  const bookmarkTutorial = () => {
    if (!isAdded) {
      setIsAdded(isAdded);
      //TODO: ADD MUTATION TO ADD BOOKMARK
    } else {
      return;
    }
  };

  // get tutorial data and destructure fields to render
  const { loading, err, data } = useQuery(GET_TUTORIAL, {
    variables: { tutorialId: tutorialId },
  });
  console.log(loading, err, data);
  if (loading) {
    return <p>Loading your tutorial...</p>;
  }
  if (err) {
    return <p>Error loading your tutorial</p>;
  }

  const tutorial = data?.tutorial;
  if (!tutorial) {
    return <p>Tutorial not found</p>;
  }
  // destructure fields from tutorial object
  const { teacher, categories, lessons, overview, reviews } = tutorial;
  const username = teacher?.[0]?.username ?? 'Deleted user';
  const duration = tutorial.totalDuration;
  const totalLessons = tutorial.lessons.length;

  //map categories array for use on/around 180
  function categoryList(categories) {
    return (
      <>
        {categories.map((category) => (
          <Chip
            key={category._id}
            label={category.category}
            className={classes.chip}
          />
        ))}
      </>
    );
  }

  //map lessons array for use in list on/around line 196
  function lessonList(lessons) {
    return (
      <>
        {lessons.map((lesson) => (
          <Card
            key={lesson._id}
            style={{ backgroundColor: '#dae9f7', margin: 2 }}
          >
            <Link
              to={`/tutorial/${tutorialId}/lesson/${lesson._id}`}
              key={lesson._id}
              onClick={toggleVisibility}
            >
              <p>{lesson.name}</p>
            </Link>
          </Card>
        ))}
      </>
    );
  }

  //map reviews array for use on/around line 226
  function reviewList(reviews) {
    return (
      <>
        {reviews.map((review) => (
          <Card
            key={review._id}
            style={{ backgroundColor: '#dae9f7', margin: 2 }}
          >
            <Grid container>
              <Grid
                item
                xs={4}
              >
                <Rating
                  name='read-only'
                  value={review.rating}
                  readOnly
                />
                <p>{review.reviewer}</p>
              </Grid>
              <Grid
                item
                xs={8}
              >
                <p>{review.comment}</p>
              </Grid>
            </Grid>
          </Card>
        ))}
      </>
    );
  }
  //get number of reviews
  let totalReviews = reviews.length;
  console.log(reviews.length);

  return (
    <div className='root'>
      <Container>
        <Typography
          variant='h4'
          style={{
            color: '#283845',
            fontWeight: 'bold',
            margin: '2%',
          }}
        >
          {tutorial?.title}
        </Typography>

        <Grid
          container
          justifyContent='space-around'
          className='title'
          display='flex'
          alignItems='center'
        >
          <Grid
            item
            container
            xs={3}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <AccountCircle fontSize='large' />
            <Typography
              variant='h6'
              fontWeight='bold'
              style={{ marginLeft: '5%' }}
            >
              {' '}
              {username}
            </Typography>
          </Grid>
          <Divider
            orientation='vertical'
            flexItem
          />
          <Grid
            item
            xs={3}
          >
            <Typography variant='h6'>
              Time to complete: {duration} minutes
            </Typography>
          </Grid>
          <Divider
            orientation='vertical'
            flexItem
          />
          <Grid
            item
            xs={3}
          >
            <HalfRating rating={tutorial.averageRating} />
            <Typography variant='subtitle1'>
              {reviews.length} Ratings
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={10}
            justifyContent='center'
            style={{ marginTop: '3%' }}
          >
            {categoryList(categories)}
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent='center'
          spacing={2}
          style={{
            color: '#283845',
            marginTop: '2%',
          }}
        >
          <Grid
            item
            xs={5}
          >
            <Card
              style={{
                backgroundColor: '#dae9f7',
                border: '0.5rem solid #92b4d4',
              }}
            >
              <CardMedia
                component='img'
                image={tutorial.thumbnail}
                title='Media image provided by user'
              />
            </Card>
          </Grid>
          <Grid
            item
            container
            direction='column'
            xs={5}
          >
            <Typography variant='body1'>{overview}</Typography>

            <CommentForm />
          </Grid>

          <Grid
            item
            xs={10}
          >
            <Card style={{ backgroundColor: '#92b4d4', padding: 5 }}>
              {reviewList(reviews)}
            </Card>
            {/* TODO: ADD SCROLL BAR FOR REVIEWS */}
          </Grid>
        </Grid>
      </Container>
      <Divider variant='middle' />
      <Container>
        <Grid
          container
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
          spacing={2}
          style={{
            color: '#283845',
            marginTop: '2%',
          }}
        >
          <Grid
            item
            xs={12}
          >
            <Card
              style={{
                backgroundColor: '#dae9f7',
                border: '0.5rem solid #92b4d4',
              }}
            >
              <CardContent>
                <Typography
                  variant='h5'
                  component='h2'
                >
                  This tutorial has {totalLessons} lessons:
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMore />
                  </IconButton>
                </Typography>
                <Collapse
                  in={expanded}
                  timeout='auto'
                  unmountOnExit
                >
                  <CardContent>{lessonList(lessons)}</CardContent>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {!isHidden ? (
        <Container toggleVisibility={toggleVisibility}>
          <Grid
            container
            justifyContent='space-around'
            spacing={2}
            style={{
              color: '#283845',
              margin: '2%',
            }}
          >
            {/* <Grid
              item
              xs={5}
            >
              <Button
                variant='contained'
                className={classes.button}
                startIcon={<SkipPrevious fontSize='large' />}
              >
                Previous Lesson
              </Button>
            </Grid>
            <Grid
              item
              xs={5}
            >
              <Button
                variant='contained'
                className={classes.button}
                endIcon={<SkipNext fontSize='large' />}
              >
                Next Lesson
              </Button>
            </Grid>
           */}
            <Grid
              item
              xs={10}
            >
              <ViewLesson />
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </div>
  );
}

export default ViewTutorial;
