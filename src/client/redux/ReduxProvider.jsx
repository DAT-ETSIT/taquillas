import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import TestView from '../views/TestView';
import ErrorView from '../views/ErrorView';

// import { questions } from "../assets/mock-data";

export default class ReduxProvider extends React.Component {
	constructor(props) {
		super(props);
		this.store = store;
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
