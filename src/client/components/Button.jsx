import React from 'react';

export default class ButtonExample extends React.PureComponent {
	render() {
		const {
			extraClasses, value, action, text, tabIndex,
		} = this.props;

		return (
			<div
				role="button"
				tabIndex={tabIndex}
				className={`button ${extraClasses}`}
				value={value}
				onClick={(e) => {
					action(parseInt(e.target.getAttribute('value'), 10));
				}}
				onKeyDown={(e) => {
					action(parseInt(e.target.getAttribute('value'), 10));
				}}
			>
				{text}
			</div>
		);
	}
}
