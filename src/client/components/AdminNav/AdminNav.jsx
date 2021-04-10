import React from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import './styles.css';

const AdminNav = () => {
	const location = useLocation();
	return (
		<nav>
			<NavLink
				location="/admin/requests"
				text="Solicitudes"
				isActive={location.pathname === '/admin/requests'}
			/>
			<NavLink
				location="/admin/payments"
				text="Pagos"
				isActive={location.pathname === '/admin/payments'}
			/>
			<NavLink
				location="/admin/rentals"
				text="Préstamos"
				isActive={location.pathname === '/admin/rentals'}
			/>
			<NavLink
				location="/admin/users"
				text="Usuarios"
				isActive={location.pathname === '/admin/users'}
			/>
			<NavLink
				location="/admin/lockers"
				text="Taquillas"
				isActive={location.pathname === '/admin/lockers'}
			/>
			<NavLink
				location="/admin/locations"
				text="Ubicaciones"
				isActive={location.pathname === '/admin/locations'}
			/>
		</nav>
	);
};

export default AdminNav;
