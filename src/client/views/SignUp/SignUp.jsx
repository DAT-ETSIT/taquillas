import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Logo from '../../public/images/logo.svg';
import './styles.css';

const SignUp = () => {
	const session = useSelector((state) => state.session);
	const history = useHistory();
	useEffect(() => {
		if (!session.email) {
			history.push('/');
		}
	}, [session]);
	const logo = (
		<div className="logo">
			<img src={Logo} alt="Taquillas" /> Taquillas
		</div>
	);

	return (
		<div className="signUpSection">
			{logo}
			<SignUpForm />
		</div>
	);
};

export default SignUp;
