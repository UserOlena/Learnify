import { React } from 'react';
import { useParams } from 'react-router-dom';

//Material-UI imports
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

//database-related imports
import { useQuery } from '@apollo/client';
import { GET_LESSON } from '../utils/queries/lessonQueries';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export function ViewLesson() {
  const classes = useStyles();
  

 

  //get index and ID from URL and get associated lesson data from db
  const { index, lessonId } = useParams();
  const { loading, err, data } = useQuery(GET_LESSON, {
    variables: { lessonId: lessonId },
  });
  console.log(loading, err, data);
  if (loading) {
    return <p>Loading your lesson...</p>;
  }
  if (err) {
    return <p>Error loading your lesson</p>;
  }

  return (
    <Container>
    <Grid
      container
      justifyContent='center'
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='Contemplative Reptile'
            height='140'
            image='/static/images/cards/contemplative-reptile.jpg'
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
            >
              Lizard
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
          >
            Share
          </Button>
          <Button
            size='small'
            color='primary'
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
    </Container>
  );
}

export default ViewLesson;
