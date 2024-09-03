import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useUpdateProfileMutation } from '../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Typography } from '@mui/material';

// TODO: Formik + validation
const ChangePassword = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();

	const [updateProfile, { isLoading }] = useUpdateProfileMutation();
	// @ts-ignore
	const { userInfo } = useSelector((state) => state.auth);
	console.log('🚀 ~ ChangePassword ~ userInfo:', userInfo);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (newPassword !== confirmPassword) {
				return toast.error('Password mismatch');
			}
			const res = await updateProfile({
				_id: userInfo._id,
				newPassword,
				currentPassword,
			}).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success('Profile updated');
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<FormContainer>
			<Typography variant="h1" fontSize={40}>
				Change Password
			</Typography>
			<Form onSubmit={submitHandler}>
				<Form.Group className="my-2">
					<Form.Label>Current Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Current Password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2">
					<Form.Label>New Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter New Password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Re-enter New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				{isLoading && <Loader />}
				<Button type="submit" variant="primary" className="mt-3">
					Update
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ChangePassword;
