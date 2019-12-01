import React, { Component } from 'react';
import { fetchGet } from '../util';

export default class TestView extends Component {
	constructor() {
		super();
		this.state = {
			pong: false,
		};
	}

	componentDidMount() {
		fetchGet('/api/v1/ping')
			.then((r) => r.json())
			.then((res) => {
				this.setState({
					pong: res.pong,
				});
			});
	}

	render() {
		const { pong } = this.state;

		return (
			<div>
				<h1>Hello, world!</h1>
				{!pong ? 'Awaiting pong...' : 'Pong!'}
			</div>
		);
	}
}
