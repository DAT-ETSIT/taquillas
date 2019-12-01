import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TestView from './views/TestView';
import ErrorView from './views/ErrorView';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={TestView} />
				<Route path="/500" render={(props) => <ErrorView {...props} code={500} />} />
				<Route render={(props) => <ErrorView {...props} code={404} />} />
			</Switch>
		</BrowserRouter>
	);
}
