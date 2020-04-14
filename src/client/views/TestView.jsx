import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGet } from '../util';
import { receivePong } from '../redux/actions/pong';


const TestView = () => {
	const pong = useSelector((state) => state.pong);
	const dispatch = useDispatch();
	useEffect(() => {
		fetchGet('/api/v1/ping')
			.then((r) => r.json())
			.then(() => dispatch(receivePong()));
	});
	return (
		<div>
			<h1>Hello, world!</h1>
			{!pong ? 'Awaiting pong...' : 'Pong!'}
		</div>
	);
};

export default TestView;
