import { Button, FormHelperText } from '@mui/material';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../utils/mutations/userMutations';
import { DELETE_LESSON } from '../utils/mutations/lessonMutations';
import { DELETE_TUTORIAL } from '../utils/mutations/tutorialMutations';
import { DELETE_COMMENT } from '../utils/mutations/commentMutations';


//delte button that takes in a case prop to check if the case is user, lesson, tutorial, or comment
// another prop of id to pass in the id of the case
export function DeleteButton(props) {
    //this checks case and switch to the correct mutation
    const [deleteUser, { error: mutationError }] = useMutation(DELETE_USER);
    const handleDelete = () => {
        switch (props.case) {
            case 'user':
                deleteUser();
                //delete user mutation
                break;
            case 'lesson':
                //delete lesson mutation
                break;
            case 'tutorial':
                //delete tutorial mutation
                break;
            case 'comment':
                //delete comment mutation
                break;
            default:
                break;
        }
    }
    return (
        <>
            <Button onClick={handleDelete} variant="contained" type="submit">
                Delete
            </Button>
            {error && <FormHelperText error={true}>{error}</FormHelperText>}
        </>
    );

}