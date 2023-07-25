import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../utils/mutations/userMutations';
import { useState } from 'react';
import { isEmptyInput, validateInput } from '../utils/validation';

import { Button, FormHelperText } from '@mui/material';

export function ResetPassword({textInput, email}) {

    const [forgotPassword, { error: mutationError }] = useMutation(FORGOT_PASSWORD);
    const [error, setError] = useState();

    async function handleClick(e) {
        e.preventDefault();
        console.log('clicked');

        if (isEmptyInput(email)) {
            setError('Please enter your email address');
            return;
        } else if (!validateInput(email, 'email')) {
            setError('Please enter a valid email address');
            return;
        } 

        try {
            const { data } = await forgotPassword({
                variables: { email }
            });
            if(mutationError) {
                setError('Something went wrong:', mutationError );
                return;
            }

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Button 
            onClick={handleClick}
            variant="contained"
            type='submit'
            >{textInput}</Button>
            {error && (
            <FormHelperText 
            error={true}>{error}
            </FormHelperText>)}
        </>
    );
}

export default ResetPassword;