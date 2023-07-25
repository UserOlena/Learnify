import { Button, FormHelperText } from '@mui/material';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../utils/mutations/userMutations';
import { DELETE_LESSON } from '../utils/mutations/lessonMutations';
import { DELETE_TUTORIAL } from '../utils/mutations/tutorialMutations';
import { DELETE_REVIEW } from '../utils/mutations/reviewMutations';

//delte button that takes in a case prop to check if the case is user, lesson, tutorial, or comment
// another prop of id to pass in the id of the case
function DeleteButton(props) {
    //this checks case and switch to the correct mutation
    const [deleteUser, { error: userError }] = useMutation(DELETE_USER);
    const [deleteLesson, { error: lessonError }] = useMutation(DELETE_LESSON);
    const [deleteTutorial, { error: tutorialError }] = useMutation(DELETE_TUTORIAL);
    const [deleteReview, { error: reviewError }] = useMutation(DELETE_REVIEW);
    const [error, setError] = useState();
    const handleDelete = () => {
        switch (props.case) {
            case 'user':
                //delete user mutation
                deleteUser();
                if(userError){
                    setError('Something went wrong:', userError);
                }                
                break;
            case 'lesson':
                //delete lesson mutation
                deleteLesson({
                    variables: { _id: props._id }
                });
                if(lessonError){
                    setError('Something went wrong:', lessonError);
                }
                break;
            case 'tutorial':
                //delete tutorial mutation
                deleteTutorial({
                    variables: { _id: props._id }
                });
                if(tutorialError){
                    setError('Something went wrong:', tutorialError);
                }
                break;
            case 'review':
                //delete comment mutation
                deleteReview({
                    variables: { _id: props._id }
                });
                if(reviewError){
                    setError('Something went wrong:', reviewError);
                }
                break;
            default:
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