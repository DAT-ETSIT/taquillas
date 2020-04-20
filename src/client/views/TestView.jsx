import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import doPing from '../utils/api/pong';


const TestView = () => {
	const pong = useSelector((state) => state.pong);
	useEffect(() => {
		doPing();
	}, []);
	return (
		<div>
			<h1>Hello, world!</h1>
			{!pong ? 'Awaiting pong...' : 'Pong!'}
		</div>
	);
};

export default TestView;
