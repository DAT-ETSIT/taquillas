import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../../utils/api/session';
import { signUp } from '../../utils/api/users';
import './styles.css';

const SignUpForm = () => {
	const session = useSelector((state) => state.session);
	const [data, setData] = useState({
		name: '',
		phone: '',
		dni: '',
		email: '',
	});
	const history = useHistory();

	useEffect(() => {
		setData({
			...data,
			name: `${session.name} ${session.surname}` || '',
			email: session.email || '',
		});
	}, [session]);

	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		signUp(data)
			.then(() => history.push('/'));
	};
	return (
		<form className="userForm" onSubmit={handleSubmit}>
			<h2> Crear cuenta: </h2>
			<label htmlFor="name">
				Nombre:
				<input type="text" id="name" name="name" value={data.name || ''} onChange={handleInputChange} disabled />
			</label>
			<label htmlFor="email">
				Correo:
				<input type="text" id="email" name="email" value={data.email || ''} onChange={handleInputChange} disabled />
			</label>
			<label htmlFor="phone">
				Teléfono:
				<input type="text" id="phone" name="phone" placeholder="+34654654654" onChange={handleInputChange} tabIndex="0" required />
			</label>
			<label htmlFor="dni">
				DNI:
				<input type="text" id="dni" name="dni" placeholder="45548487A" onChange={handleInputChange} tabIndex="0" required />
			</label>
			<div className="formActions">
				<button type="button" onClick={() => logOut()} className="cancel"> Cancelar Registro </button>
				<input type="submit" value="Crear cuenta" className="signUpButton" tabIndex="0" />
			</div>

		</form>
	);
};

export default SignUpForm;
