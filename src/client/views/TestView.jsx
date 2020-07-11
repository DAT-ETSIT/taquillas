import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import doPing from '../utils/api/pong';
import { logOut } from '../utils/api/app/session';


const TestView = () => {
	const pong = useSelector((state) => state.pong);
	const session = useSelector((state) => state.session);
	useEffect(() => {
		doPing();
	}, []);
	return (
		<div>
			<h1>Hello, world!</h1>
			{!pong ? 'Awaiting pong...' : 'Pong!'}
			<br />
			Logged in as: {session.user.name}
			<br />
			Email: {session.user.email}
			<br />
			Admin?: {session.user.isAdmin ? 'True' : 'False'}
			<br />
			<button
				type="button"
				onClick={() => logOut()}
				style={{ marginLeft: '20px' }}
			>
				Cerrar Sesión
			</button>
		</div>
	);
};

export default TestView;
