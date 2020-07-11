import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';

const EndSession = () => {
	const location = useLocation();
	return (<Redirect to={`/?redirect=${location.pathname}`} />);
};

export default EndSession;
