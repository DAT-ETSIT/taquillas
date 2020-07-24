import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import AdminNav from '../AdminNav/AdminNav';
import './styles.css';

function Layout(props) {
	const { children } = props;
	const location = useLocation();

	return (
		<main id="main">
			<Header />
			{location.pathname.includes('admin') ? (<AdminNav />) : null}
			<div className="main_section" style={{ flexGrow: '1' }}>{children}</div>
			<div className="footer">
				<span>
					&copy; 2019-2020 &mdash; Delegación de Alumnos de Telecomunicación
				</span>
			</div>
		</main>
	);
}

export default Layout;
