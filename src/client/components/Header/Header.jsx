import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import NavLink from '../NavLink/NavLink';
import Logo from '../../public/images/logo.svg';
import './styles.css';

function Header() {
	const location = useLocation();
	const session = useSelector((state) => state.session);
	return (
		<header>
			<Link to="/">
				<div className="headerLogo">
					<img src={Logo} alt="Taquillas" />
				</div>
			</Link>
			<div className="headerButtons">
				<NavLink
					location="/myLockers"
					text="Mis Taquillas"
					isActive={location.pathname === '/myLockers'}
				/>
				<NavLink
					location="/me"
					text="Mi Perfil"
					isActive={location.pathname === '/me'}
				/>

				{(session.user.isAdmin
					? (
						<NavLink
							location="/admin/requests"
							text="Administrar"
							isActive={location.pathname.includes('/admin')}
						/>
					)
					: null
				)}

				<NavLink
					location="/logout"
					isActive={false}
				>
					<FiLogOut />
				</NavLink>
			</div>
		</header>
	);
}

export default Header;
