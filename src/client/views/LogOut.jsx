import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { logOut } from '../utils/api/session';

const LogOut = () => {
	useEffect(() => {
		logOut();
	}, []);
	return (<Navigate to="/login" />);
};

export default LogOut;
