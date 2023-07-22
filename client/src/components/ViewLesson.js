import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

//Material-UI imports
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
} from '@material-ui/core';

//database-related imports
import { useQuery } from '@apollo/client';
import { GET_LESSON } from '../utils/queries/lessonQueries';

const useStyles = makeStyles({
    root: {
        maxWidth:345,
    }
});

export function ViewLesson() {
    const classes = useStyles();


};

export default ViewLesson;