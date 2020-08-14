import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logOut } from '../utils/api/session';

const LogOut = () => {
	useEffect(() => {
		logOut();
	}, []);
	return (<Redirect to="/login" />);
};

export default LogOut;
