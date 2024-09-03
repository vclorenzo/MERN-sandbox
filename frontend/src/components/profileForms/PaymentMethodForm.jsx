// import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../slices/modalSlice';
import FormContainer from '../FormContainer';
import AddCreditCardModal from '../modal/AddCreditCardModal';
import ConfirmCreditCardModal from '../modal/ConfirmCreditCardModal';
import dayjs from 'dayjs';

const PaymentMethodForm = () => {
	// @ts-ignore
	const { userInfo } = useSelector((state) => state.auth);
	const { modals } = useSelector((state) => state.modals);
	const dispatch = useDispatch();

	const handleAddModal = () => {
		dispatch(setModal({ ...modals, addCreditCardInfo: true }));
	};

	return (
		<FormContainer>
			<AddCreditCardModal />
			<ConfirmCreditCardModal />
			<Typography variant="h1" fontSize={40}>
				Payment Methods
			</Typography>
			{userInfo.creditCards?.length > 0 && (
				<Stack spacing={2}>
					{userInfo.creditCards.map((card) => (
						<Stack
							key={card.cardNumber}
							direction={'row'}
							justifyContent={'space-between'}
						>
							<Typography>{card.cardNumber}</Typography>
							<Typography>
								{dayjs(card.expirationDate).format('MM/YYYY')}
							</Typography>
							<Button variant="contained" color="primary">
								DELETE
							</Button>
						</Stack>
					))}
				</Stack>
			)}
			<Button onClick={handleAddModal}>ADD</Button>
			<Button variant="contained" color="primary" fullWidth>
				Update
			</Button>
		</FormContainer>
	);
};

export default PaymentMethodForm;
