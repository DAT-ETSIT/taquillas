import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../public/images/logo.svg';
import './styles.css';

const Welcome = () => {
	const location = useLocation();
	const redirect = new URLSearchParams(location.search).get('redirect');

	return (
		<div className="welcomeSection">
			<div className="welcomeLogo">
				<img src={Logo} alt="Taquillas" /> Taquillas
			</div>
			<a href={`/api/v1/app/login?redirect=${redirect || '/'}`}>
				<div className="loginButton">Iniciar Sesión</div>
			</a>
		</div>
	);
};

export default Welcome;
