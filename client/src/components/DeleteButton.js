import { Button, FormHelperText } from '@mui/material';
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { REMOVE_USER } from '../utils/mutations/userMutations';
import { DELETE_LESSON } from '../utils/mutations/lessonMutations';
import { DELETE_TUTORIAL } from '../utils/mutations/tutorialMutations';
import { DELETE_REVIEW } from '../utils/mutations/reviewMutations';

//delte button that takes in a case prop to check if the case is user, lesson, tutorial, or comment
// another prop of id to pass in the id of the case
export function DeleteButton(props) {
    //this checks case and switch to the correct mutation
    const [deleteUser, { error: userError }] = useMutation(REMOVE_USER);
    const [deleteLesson, { error: lessonError }] = useMutation(DELETE_LESSON);
    const [deleteTutorial, { error: tutorialError }] = useMutation(DELETE_TUTORIAL);
    const [deleteReview, { error: reviewError }] = useMutation(DELETE_REVIEW);
    //set error state
    const [error, setError] = useState();

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log(props.case);
        console.log('at handle delete');
        switch (props.case) {
            case 'user':
                //delete user mutation
                try {
                    await deleteUser();
                    if(userError){
                        setError('Something went wrong:', userError);
                        break;
                    }
                    window.location.assign('/signin');
                    window.alert('User deleted');
                } catch (err) {
                    setError('Something went wrong:', err);
                }
                break;
            case 'lesson':
                //delete lesson mutation
                try {
                    await deleteLesson({
                        variables: { _id: props._id }
                    });
                    if(lessonError){
                        setError('Something went wrong:', lessonError);
                        break;
                    }
                    window.alert('Lesson deleted');
                } catch (err) {
                    setError('Something went wrong:', err);
                }
            case 'tutorial':
                //delete tutorial mutation
                try {
                    await deleteTutorial({
                        variables: { _id: props._id }
                    });
                    if(tutorialError){
                        setError('Something went wrong:', tutorialError);
                        break;
                    }
                    window.alert('Tutorial deleted');
                } catch (err) {
                    setError('Something went wrong:', err);
                }
                break;
            case 'review':
                //delete comment mutation
                try {
                    deleteReview({
                        variables: { _id: props._id }
                    });
                    if(reviewError){
                        setError('Something went wrong:', reviewError);
                    }
                    break;
                } catch (err) {
                    setError('Something went wrong:', err);
                }
            default:
                setError('Something went wrong:', 'No case was found');
                break;
        }
    };

    return (
        <>
            <Button onClick={handleDelete} variant="contained" type="submit">
                Delete
            </Button>
            {error && <FormHelperText error={true}>{error}</FormHelperText>}
        </>
    );

}

export default DeleteButton;