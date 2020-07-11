import { Provider } from 'react-redux';
import React from 'react';
import store from './store';
import App from '../views/App';

export default class ReduxProvider extends React.Component {
	constructor(props) {
		super(props);
		this.store = store;
	}

	render() {
		return (
			<Provider store={this.store}>
				<App />
			</Provider>
		);
	}
}
