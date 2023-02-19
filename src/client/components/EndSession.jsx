import React, { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';

function EndSession() {
	const location = useLocation();
	useEffect(() => {
		window.location.href = `/api/v1/session/login?redirect=${location.pathname}`;
	}, []);
	return (<Fragment key="empty" />);
}

export default EndSession;
