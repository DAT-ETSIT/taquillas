import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function NavLink(props) {
	const {
		text,
		children,
		isActive,
		location: linkLocation,
	} = props;
	return (
		<Link to={linkLocation}>
			<div className={`navLink ${isActive ? 'activeNavLink' : ''}`}>
				{text || ''}{children || ''}
			</div>
		</Link>
	);
}

export default NavLink;
