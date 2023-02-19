import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getSession } from '../utils/api/session';
import AppRouter from './AppRouter';

const App = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		getSession()
			.then(() =>	setIsLoaded(true));
	}, []);
	if (!isLoaded) {
		return (<CircularProgress style={{ position: 'fixed', top: '30%', left: '50%' }} />);
	}

	return (
		<AppRouter />
	);
};

export default App;
