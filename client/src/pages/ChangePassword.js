import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../utils/mutations/userMutations';
import { useState } from 'react';

// Material UI imports
import { Button, TextField, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

//change password function takes in params for token and asks for new password
export function ChangePassword() {
	const token = useParams().token;
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [resetPassword, { error: mutationError }] = useMutation(RESET_PASSWORD);
	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	//handle submit function checks if password and confirm password match
	//if they do, it sends a request to the server to change the password
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		try {
			const { data } = await resetPassword({
				variables: { password, token },
			});
			if (mutationError) {
				setError('Something went wrong:', mutationError);
				return;
			}
			setSuccess('Password changed successfully');
			console.log(data);
			window.location.assign('/signin');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Typography component="h1" variant="h5">
				My Profile
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Box>
					<Typography component="h2" variant="h6">
						Password
					</Typography>
				</Box>
				<TextField
					fullWidth
					type="password"
					id="password"
					name="Password"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value.trim())}
				/>
				<br />
				<TextField
					fullWidth
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					label="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value.trim())}
				/>
				{error && <Typography color="error">{error}</Typography>}
				{success && <Typography color="success">{success}</Typography>}
				<Button type="submit" variant="contained">
					Save
				</Button>
			</Box>
		</div>
	);
}

export default ChangePassword;
