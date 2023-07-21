import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//Material-UI imports
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

//database-related imports
import { useQuery } from '@apollo/client';
import { GET_TUTORIAL } from '../utils/queries/tutorialQueries';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3%',
  },
  title: {
    margin: '3%',
  },
  card: {
    backgroundColor: '#dce6f5',
  },
  chip: {
    margin: 2,
    ...theme.typography.button,
    backgroundColor: '#98b7f5',
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

  const [expanded, setExpanded] = useState(false);
  //function to handle click on expand icon and update State
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //get ID from URL and get associated {tutorial} from db
  const { ID } = useParams();
  const { loading, err, data } = useQuery(GET_TUTORIAL, {
    variables: { id: ID },
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
  //destructure fields from tutorial object
  const { teacher } = tutorial;
  const username = teacher?.[0]?.username;
  const { categories } = tutorial;
  const duration = tutorial.totalDuration;
  const { lessons } = tutorial;
  const { reviews } = tutorial;

  //map categories array for use on/around 180
  function categoryList(categories) {
    return (
      <>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.category}
            className={classes.chip}
          />
        ))}
      </>
    );
  }

  //map lessons array for use on/around line 196
  function lessonList(lessons) {
    return (
      <>
        {lessons.map((lesson) => (
          <Link
            to={`/lesson/${lesson.id}`}
            key={lesson._id}
          >
            <p>{lesson.name}</p>
          </Link>
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
            key={review.id}
            style={{ backgroundColor: '#dce6f5', margin: 2 }}
          >
            <Rating
              name='read-only'
              value={review.rating}
              readOnly
            />
            <p>{review.comment}</p>
          </Card>
        ))}
      </>
    );
  }

  //calculate average rating
  let totalRating = 0;
  for (const review of reviews) {
    totalRating += review.rating;
  }
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  console.log(averageRating);

  return (
    <div className='root'>
      <Container className='title'>
        <Typography
          variant='h4'
          style={{
            color: '#283845',
            fontWeight: 'bold',
          }}
        >
          {tutorial?.title}
        </Typography>
        <Box>
          <Rating
            name='read-only'
            value={averageRating}
            readOnly
          />
          <Typography variant='subtitle1'>{reviews.length} Ratings</Typography>
        </Box>
        <Box>
          <Typography variant='h5'>{username}</Typography>
          <Typography variant='h6'>
            Time to complete: {duration} minutes
          </Typography>
        </Box>
        <Box direction='row'>{categoryList(categories)}</Box>
      </Container>
      <Grid
        container
        className={classes.info}
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'
      >
        <Grid
          item
          xs={10}
          md={5}
        >
          <Card
            style={{
              backgroundColor: '#dce6f5',
              margin: '5%',
              border: '1rem solid #6393f2',
            }}
          >
            <CardMedia
              component='img'
              image={tutorial.thumbnail}
              title='Media image provided by user'
            />
            <CardContent>
              <Typography
                variant='h5'
                component='h2'
              >
                Lessons
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
        <Grid
          item
          xs={10}
          md={5}
        >
          <Card
            style={{
              backgroundColor: '#6393f2',
              margin: '5%',
              paddingTop: '3%',
            }}
          >
            <Typography
              variant='h5'
              component='h2'
            >
              Reviews
            </Typography>

            <Card
              style={{ backgroundColor: '#6393f2', margin: 3, padding: 10 }}
            >
              {reviewList(reviews)}
            </Card>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewTutorial;