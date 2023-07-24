import { React } from 'react';
import { useParams } from 'react-router-dom';

//Material-UI imports
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

//database-related imports
import { useQuery } from '@apollo/client';
import { GET_LESSON } from '../utils/queries/lessonQueries';

export function ViewLesson({ lessonFromAddLessons, stylesFromAddLesson }) {
  //get index and ID from URL and get associated lesson data from db
  const { index, lessonId } = useParams();

  // If lesson was passed from AddLessons use that id to get lesson
  // otherwise use lessonId from useParams()
  const { loading, err, data } = useQuery(GET_LESSON, {
    variables: {
      lessonId: lessonFromAddLessons ? lessonFromAddLessons._id : lessonId,
    },
  });
  console.log(loading, err, data);
  if (loading) {
    return <p>Loading your lesson...</p>;
  }
  if (err) {
    return <p>Error loading your lesson</p>;
  }

  const lesson = data?.lesson;
  if (!lesson) {
    return <p>Lesson not found</p>;
  }

  //destructure fields from lesson object
  const { name, body, media, duration } = lesson;

  return (
    <Container style={stylesFromAddLesson}>
      <Grid container justifyContent='center'>
        <Grid item xs={10}>
          <Card>
            <CardActionArea>
              {media && (
                <CardMedia
                  component='img'
                  alt='User-provided image'
                  height='140'
                  image={media}
                  title='Lesson Media'
                />
              )}
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {name}
                </Typography>
                <Typography
                  gutterBottom
                  variant='body2'
                  color='textSecondary'
                  component='p'
                >
                  Time: {duration} minute(s)
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {body}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewLesson;
