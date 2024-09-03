import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modals: {
		addCreditCardInfo: false,
		confirmCreditCardInfo: false,
		cancelCreditCardInfo: false,
		successCreditCardInfo: false,
		errorCreditCardInfo: false,
	},
};

const modalSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setModal: (state, action) => {
			state.modals = action.payload;
		},
	},
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
