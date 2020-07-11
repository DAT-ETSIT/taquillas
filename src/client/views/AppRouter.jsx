import React, { Fragment } from 'react';
import {
	BrowserRouter, Route,
	Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import TestView from './TestView';
import Welcome from './Welcome/Welcome';
import ErrorView from './ErrorView';
import SignUp from './SignUp/SignUp';
import EndSession from '../components/EndSession';

const AppRouter = () => {
	const session = useSelector((state) => state.session);

	const adminRoutes = (
		<Fragment key="adminRoutes" />
	);
	const userLogedSwitch = (
		<Switch>
			<Route exact path="/" component={TestView} />
			{session.user && session.user.isAdmin ? adminRoutes : null}
			<Route path="/500" render={(props) => <ErrorView {...props} code={500} />} />
			<Route render={(props) => <ErrorView {...props} code={404} />} />
		</Switch>
	);

	const defaultSwitch = (
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route exact path="/signup" component={SignUp} />
			<Route path="/500" render={(props) => <ErrorView {...props} code={500} />} />
			<Route render={() => <EndSession />} />
		</Switch>
	);
	const routerSwitch = session.user ? userLogedSwitch : defaultSwitch;
	return (
		<BrowserRouter>
			{ routerSwitch }
		</BrowserRouter>
	);
};

export default AppRouter;
