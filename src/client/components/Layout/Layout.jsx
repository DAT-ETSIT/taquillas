import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import AdminNav from '../AdminNav/AdminNav';
import Message from '../Message/Message';
import { getSession } from '../../utils/api/session';
import './styles.css';

function Layout(props) {
	const { children } = props;
	const location = useLocation();

	useEffect(() => {
		getSession();
	}, [location.pathname]);

	return (
		<main id="main">
			<Message />
			<Header />

			{location.pathname.includes('admin') ? (<AdminNav />) : null}
			<div className="main_section" style={{ flexGrow: '1' }}>{children}</div>
			<div className="footer">
				<span>
					&copy; 2022-2023 &mdash; Delegación de Alumnos de Telecomunicación
				</span>
			</div>
		</main>
	);
}

export default Layout;
