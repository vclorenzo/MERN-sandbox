import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import store from '../store/store.js';
import { Provider } from 'react-redux';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Chat from './components/Chat.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import ProfileFormik from './components/profileForms/ProfileFormik.jsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/chat" element={<Chat />} />
			<Route path="/register" element={<Register />} />
			{/* PRIVATE ROUTES */}
			<Route path="" element={<PrivateRoute />}>
				<Route path="/profile" element={<Profile />} />
				<Route path="/profileFormik" element={<ProfileFormik />} />
				<Route path="/change-password" element={<ChangePassword />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<LocalizationProvider dateAdapter={AdapterDayjs}>
		<Provider store={store}>
			{/* <React.StrictMode> */}
			<RouterProvider router={router} />
			{/* </React.StrictMode> */}
		</Provider>
	</LocalizationProvider>
);
