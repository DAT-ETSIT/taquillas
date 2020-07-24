import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logOut } from '../utils/api/app/session';

const LogOut = () => {
	useEffect(() => {
		logOut();
	}, []);
	return (<Redirect to="/" />);
};

export default LogOut;
