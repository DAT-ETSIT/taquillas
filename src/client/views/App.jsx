import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getSession } from '../utils/api/app/session';
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
