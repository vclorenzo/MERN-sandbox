import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { setModal } from '../../../slices/modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, Stack, TextField } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useUpdateProfileMutation } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

// TODO: Credit Cards
// [ ] : Delete Credit Card

const AddCreditCardModal = () => {
	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);

	const [values, setValues] = useState({
		cardNumber: '',
		nameOnCard: '',
		expirationDate: null,
		cvv: '',
	});
	// @ts-ignore
	const { modals } = useSelector((state) => state.modals);
	const dispatch = useDispatch();

	const handleCloseModal = () => {
		dispatch(
			setModal({
				addCreditCardInfo: false,
				confirmCreditCardInfo: false,
				cancelCreditCardInfo: false,
				successCreditCardInfo: false,
				errorCreditCardInfo: false,
			})
		);
	};

	const [updateProfile, { isLoading }] = useUpdateProfileMutation();

	// @ts-ignore
	const { userInfo } = useSelector((state) => state.auth);

	const handleConfirmModal = () => {
		dispatch(setModal({ ...modals, confirmCreditCardInfo: true }));
		dispatch(
			setCredentials({
				...userInfo,
				creditCards: [...(userInfo.creditCards || []), values],
			})
		);

		// dispatch(setCredentials({ ...values }));
		// try {
		// 	const res = await updateProfile({
		// 		_id: userInfo._id,
		// 		cardNumber: values.cardNumber,
		// 		name: values.name,
		// 		expirationDate: values.expirationDate,
		// 		cvv: values.cvv,
		// 	}).unwrap();

		// 	dispatch(setCredentials({ ...res }));
		// 	toast.success('Profile updated');
		// } catch (err) {
		// 	toast.error(err?.data?.message || err.error);
		// }
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleConfirmModal();
	};

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
			expirationDate: dayjs(date),
		});
	};

	return (
		<div>
			<Modal
				open={modals.addCreditCardInfo}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{/* <Typography variant="h1">Profile</Typography> */}
					<Form onSubmit={handleSubmit}>
						<FormControl fullWidth sx={{ marginBottom: 2 }}>
							<Form.Label>Card Number</Form.Label>
							<TextField
								name="cardNumber"
								variant="outlined"
								placeholder="Card Number"
								value={values.cardNumber}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl fullWidth sx={{ marginBottom: 2 }}>
							<Form.Label>Name</Form.Label>
							<TextField
								name="nameOnCard"
								variant="outlined"
								placeholder="Name on Card"
								value={values.nameOnCard}
								onChange={handleChange}
							/>
						</FormControl>
						<Stack direction={'row'} spacing={2}>
							<FormControl fullWidth sx={{ marginBottom: 2 }}>
								<Form.Label>Expiration Date</Form.Label>

								<DatePicker
									value={values.expirationDate}
									onChange={(newValue) => {
										handleDateChange(newValue);
									}}
								/>
							</FormControl>
							<FormControl fullWidth sx={{ marginBottom: 2 }}>
								<Form.Label>CVV</Form.Label>
								<TextField
									name="cvv"
									variant="outlined"
									placeholder="CVV"
									value={values.cvv}
									onChange={handleChange}
									margin="normal"
								/>
							</FormControl>
						</Stack>
					</Form>
					{isLoading && <Loader />}
					{/* <Button onClick={handleCloseModal}>CLOSE</Button> */}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleConfirmModal}
					>
						Update
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default AddCreditCardModal;
