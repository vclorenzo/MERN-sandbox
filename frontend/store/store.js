import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import modalReducer from '../slices/modalSlice';
import { apiSlice } from '../slices/apiSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		modals: modalReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
