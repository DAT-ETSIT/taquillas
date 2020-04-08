import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalState from './reducers';
import TestView from '../views/TestView';
import ErrorView from '../views/ErrorView';

// import { questions } from "../assets/mock-data";

export default class ReduxProvider extends React.Component {
	constructor(props) {
		super(props);
		this.initialState = {
			pong: false,
			loggedUser: {},
			lockers: [],
			users: [],
			rentals: [],
			locations: [],
			payments: [],
			payment: [],
			lockerStates: [],
			rentalStates: [],
			paymentMethods: [],
		};
		this.store = this.configureStore();
	}

	configureStore() {
		return createStore(GlobalState, this.initialState);
	}

	render() {
		return (
			<Provider store={this.store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={TestView} />
						<Route path="/500" render={(props) => <ErrorView {...props} code={500} />} />
						<Route render={(props) => <ErrorView {...props} code={404} />} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}
