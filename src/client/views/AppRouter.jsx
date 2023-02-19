import React, { Fragment } from 'react';
import {
	BrowserRouter, Route,
	Routes,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import TestView from './TestView';
import Welcome from './Welcome/Welcome';
import ErrorView from './ErrorView';
import SignUp from './SignUp/SignUp';
import Catalog from './Catalog/Catalog';
import Profile from './Profile/Profile';
import Locations from './Locations';
import Lockers from './Lockers';
import Payments from './Payments';
import Rentals from './Rentals';
import Requests from './Requests';
import Users from './Users';
import EndSession from '../components/EndSession';
import Layout from '../components/Layout/Layout';
import LogOut from './LogOut';
import MyLockers from './MyLockers';

function AppRouter() {
	const session = useSelector((state) => state.session);
	const adminRoutes = (
		<Fragment key="adminRoutes">
			<Route exact path="/admin/locations" element={<Locations />} />
			<Route exact path="/admin/lockers" element={<Lockers />} />
			<Route exact path="/admin/payments" element={<Payments />} />
			<Route exact path="/admin/users" element={<Users />} />
			<Route exact path="/admin/rentals" element={<Rentals />} />
			<Route exact path="/admin/requests" element={<Requests />} />
		</Fragment>
	);
	const userLogedSwitch = (
		<Layout session={session}>
			<Routes>
				<Route exact path="/" element={<Catalog />} />
				<Route exact path="/logout" element={<LogOut />} />
				<Route exact path="/myLockers" element={<MyLockers />} />
				<Route exact path="/request" element={<TestView />} />
				<Route exact path="/me" element={() => <Profile user={session.user} />} />
				{session.user && session.user.isAdmin ? adminRoutes : null}
				<Route path="/500" render={(props) => <ErrorView {...props} code={500} />} />
				<Route render={(props) => <ErrorView {...props} code={404} />} />
			</Routes>
		</Layout>
	);

	const defaultSwitch = (
		<Routes>
			<Route exact path="/" element={<Welcome />} />
			<Route exact path="/login" element={<Welcome />} />
			<Route exact path="/signup" element={<SignUp />} />
			<Route path="/500" render={(props) => <ErrorView {...props} code={500} />} />
			<Route render={() => <EndSession />} />
		</Routes>
	);
	const routerSwitch = session.user ? userLogedSwitch : defaultSwitch;
	return (
		<BrowserRouter>
			{ routerSwitch }
		</BrowserRouter>
	);
}

export default AppRouter;
