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
	Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputField from '../InputField';
import MultiStepForm, { FormStep } from '../MultiStepForm';

const ProfileFormik = () => {
	const [provinces, setProvinces] = useState([]);
	// const [email, setEmail] = useState('');
	const [values, setValues] = useState({
		name: '',
		email: '',
		birthDate: dayjs(null),
		address: '',
	});

	const validationSchema = [
		{
			obj: yup.object({
				name: yup.string().required('Name is required'),
				email: yup.string().email().required('Email is required'),
			}),
		},
		{
			obj: yup.object({
				street: yup.string().required('Street is required'),
				country: yup.string().required('Country is required'),
			}),
		},
	];

	const dispatch = useDispatch();

	const [updateProfile, { isLoading }] = useUpdateProfileMutation();
	// @ts-ignore
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
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

	return (
		<FormContainer>
			<Typography variant="h1" fontSize={40}>
				Profile
			</Typography>
			<MultiStepForm
				initialValues={{ ...values }}
				onSubmit={(values) => {
					alert(JSON.stringify(values, null, 2));
					dispatch(setCredentials({ ...values }));
				}}
			>
				<FormStep
					stepName="Person"
					onSubmit={() => {
						console.log('Step submit');
					}}
					validationSchema={validationSchema[0].obj}
				>
					<InputField name="name" label="Name" margin="normal" />
					<InputField name="email" label="Email" margin="normal" />
				</FormStep>
				<FormStep
					stepName="Address"
					onSubmit={() => {
						console.log('Step 2 submit');
					}}
					validationSchema={validationSchema[1].obj}
				>
					<InputField name="street" label="Street" margin="normal" />
					<InputField name="country" label="Country" margin="normal" />
				</FormStep>
			</MultiStepForm>
		</FormContainer>
	);
};

export default ProfileFormik;
