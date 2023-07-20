import { React } from 'react';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from '@mui-treasury/components/info';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  media: {},
  banner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',

  },
});

//TODO: GET_TITLE (line 32)
//TODO: GET_RATING (line 37)
//TODO: GET_TEACHER (line 39)
//TODO: GET_RUNTIME (line 40)

export function Tutorial() {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const classes = useStyles();

  return (
    <div className='root'>
      <Container maxWidth='sm'>
        <Typography
          variant='h3'
          style={{
            color: '#283845',
            fontWeight: 'bold',
          }}
        >
          Tutorial Title
        </Typography>
        <Box>
          <Rating
            name='read-only'
            value='{value}'
            readOnly
          />
          <Typography variant='subtitle1'># Ratings</Typography>
        </Box>
        <Box>
          <Typography variant='h5'>TeacherName</Typography>
          <Typography variant='h6'>Runtime: "value" </Typography>
        </Box>
      </Container>
      <Container>
        <Grid 
            container
            className={classes.info}
            direction='row'>
          <Grid item>
            <Box
              position={'relative'}
              width={'100%'}
              height={'100%'}
              p={2}
            >
              <CardMedia
                classes={mediaStyles}
                image={
                  'https://docs.google.com/drawings/d/e/2PACX-1vRWBUuFWRsWIG4VPDY_GFqy0yK7TPzEogdw6a0jySJDtQGHdbJH7RNeZn6D_alAU2gvkSh5016DupBk/pub?w=519&h=688'
                }
                title='tutorial-thumbnail'
              />
              <Box position={'relative'}>
                <h3>Banner Text</h3>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
