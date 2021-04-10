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
import Catalog from './Catalog/Catalog';
import Profile from './Profile/Profile';
import Locations from './Locations';
import EndSession from '../components/EndSession';
import Layout from '../components/Layout/Layout';
import LogOut from './LogOut';

const AppRouter = () => {
	const session = useSelector((state) => state.session);
	const adminRoutes = (
		<Fragment key="adminRoutes">
			<Route exact path="/admin/locations" component={Locations} />
			<Route exact path="/admin/payments" component={TestView} />
			<Route exact path="/admin/lockers" component={TestView} />
			<Route exact path="/admin/users" component={TestView} />
			<Route exact path="/admin/rentals" component={TestView} />
			<Route exact path="/admin/requests" component={TestView} />
		</Fragment>
	);
	const userLogedSwitch = (
		<Layout>
			<Switch>
				<Route exact path="/" component={Catalog} />
				<Route exact path="/logout" component={LogOut} />
				<Route exact path="/myLockers" component={TestView} />
				<Route exact path="/request" component={TestView} />
				<Route exact path="/me" component={() => <Profile user={session.user} />} />
				{session.user && session.user.isAdmin ? adminRoutes : null}
				<Route path="/500" render={(props) => <ErrorView {...props} code={500} />} />
				<Route render={(props) => <ErrorView {...props} code={404} />} />
			</Switch>
		</Layout>
	);

	const defaultSwitch = (
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route exact path="/login" component={Welcome} />
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
