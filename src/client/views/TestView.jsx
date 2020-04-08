import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchGet } from '../util';
import { receivePong } from '../redux/actions/pong';

const sendPing = function sendPing(props) {
	fetchGet('/api/v1/ping')
		.then((r) => r.json())
		.then(() => props.dispatch(receivePong()));
};

class TestView extends Component {
	componentDidMount() {
		sendPing(this.props);
	}

	componentDidUpdate() {
		sendPing(this.props);
	}

	render() {
		const { pong } = this.props;
		return (
			<div>
				<h1>Hello, world!</h1>
				{!pong ? 'Awaiting pong...' : 'Pong!'}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		...state,
	};
}

export default connect(mapStateToProps)(TestView);
