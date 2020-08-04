import React from 'react';
import './styles.css';

const Card = (props) => {
	const {
		name, description,
		stats, children,
		actions,
	} = props;

	const cardButtons = actions.map((action) => (
		<button key={action.name} className="blueGradient" type="button" onClick={action.handler}>{action.name}</button>
	));

	return (
		<div className="card">
			<div className="cardInfo">
				<div className="cardTitle">{name}</div>
				<div className="cardDescription">{description}</div>
				<div className="cardContentData">{stats.name}: {stats.description}</div>
			</div>
			<div className="cardActions">
				{cardButtons}
			</div>
			{children}
			<br />
		</div>
	);
};

export default Card;
