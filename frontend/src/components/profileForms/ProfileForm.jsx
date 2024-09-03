import { useEffect, useState } from 'react';
import FormContainer from '../FormContainer';
import { Form } from 'react-bootstrap';
import { useUpdateProfileMutation } from '../../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import {
	FormControl,
	TextField,
	Button,
	Select,
	MenuItem,
	Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import dayjs from 'dayjs';

const ProfileForm = () => {
	const [provinces, setProvinces] = useState([]);
	// const [email, setEmail] = useState('');
	const [values, setValues] = useState({
		name: '',
		email: '',
		birthDate: dayjs(null),
		address: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleDateChange = (date) => {
		setValues({
			...values,
			birthDate: dayjs(date),
		});
	};

	const dispatch = useDispatch();

	const [updateProfile, { isLoading }] = useUpdateProfileMutation();
	// @ts-ignore
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		// setName(userInfo.name);
		// setEmail(userInfo.email);
		setValues({
			...values,
			name: userInfo.name,
			email: userInfo.email,
			birthDate: userInfo.birthDate ? dayjs(userInfo.birthDate) : null,
			address: userInfo.address || null,
		});
	}, [userInfo.name, userInfo.email, userInfo.birthDate, userInfo.address]);

	useEffect(() => {
		const fetchProvinces = async () => {
			try {
				const response = await axios.get(
					'https://psgc.gitlab.io/api/provinces/'
				);
				setProvinces(response.data);
			} catch (error) {
				console.error('Error fetching provinces:', error);
			}
		};

		fetchProvinces();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch(setCredentials({ ...values }));
		// try {
		// 	const res = await updateProfile({
		// 		_id: userInfo._id,
		// 		name: values.name,
		// 		email: values.email,
		// 		address: values.address,
		// 		birthDate: values.birthDate,
		// 	}).unwrap();
		// 	dispatch(setCredentials({ ...res }));
		// 	toast.success('Profile updated');
		// } catch (err) {
		// 	toast.error(err?.data?.message || err.error);
		// }
	};

	return (
		<FormContainer>
			<Typography variant="h1" fontSize={40}>
				Profile
			</Typography>
			<Form onSubmit={handleSubmit}>
				<FormControl fullWidth sx={{ marginBottom: 2 }}>
					<Form.Label>Name</Form.Label>
					<TextField
						name="name"
						variant="outlined"
						placeholder="Enter Name"
						value={values.name}
						onChange={handleChange}
						margin="normal"
					/>
				</FormControl>
				<FormControl fullWidth sx={{ marginBottom: 2 }}>
					<Form.Label>Email Address</Form.Label>
					<TextField
						name="email"
						type="email"
						variant="outlined"
						placeholder="Enter Email"
						value={values.email}
						onChange={handleChange}
						margin="normal"
					/>
				</FormControl>
				<FormControl fullWidth sx={{ marginBottom: 2 }}>
					<Form.Label>Date of Birth</Form.Label>
					<DatePicker
						value={values.birthDate}
						onChange={(newValue) => {
							handleDateChange(newValue);
						}}
					/>
				</FormControl>
				<FormControl fullWidth sx={{ marginBottom: 2 }}>
					<Form.Label>Address</Form.Label>
					<Select
						name="address"
						value={values.address}
						onChange={handleChange}
						displayEmpty
						fullWidth
					>
						<MenuItem disabled value="">
							Select Address
						</MenuItem>
						{provinces.map((province) => (
							<MenuItem key={province.code} value={province.name}>
								{province.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{isLoading && <Loader />}
				<Button type="submit" variant="contained" color="primary" fullWidth>
					Update
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ProfileForm;
