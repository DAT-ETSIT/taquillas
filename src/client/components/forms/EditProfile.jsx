import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { updateProfile } from '../../utils/api/users';
import { getSession } from '../../utils/api/session';
import { addRequestError } from '../../redux/actions/messages';
import store from '../../redux/store';

const { dispatch } = store;
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(2),
		minWidth: 120,
	},
}));

function EditProfile(props) {
	const {
		isOpen,
		user,
		closeForm,
	} = props;

	const [userData, setUserData] = useState({
		name: '',
		phone: '',
		dni: '',
	});

	useEffect(() => {
		setUserData({
			name: user.name,
			phone: user.phone,
			dni: user.dni,
		});
	}, [user, isOpen]);

	const handleChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		closeForm();
		updateProfile(user.id, userData)
			.then(() => getSession())
			.catch((error) => dispatch(addRequestError(error)));
	};

	const classes = useStyles();

	return (
		<Dialog disableBackdropClick disableEscapeKeyDown open={isOpen} onClose={closeForm}>
			<DialogTitle>Editar Perfil</DialogTitle>
			<DialogContent>
				<form className={classes.container}>
					<FormControl className={classes.formControl}>
						<TextField
							id="standard-basic"
							label="Nombre"
							defaultValue={userData.name}
							name="name"
							onChange={handleChange}
						/>
						<br />
						<TextField
							id="standard-basic"
							label="Teléfono"
							defaultValue={userData.phone}
							name="phone"
							onChange={handleChange}
						/>
						<br />
						<TextField
							id="standard-basic"
							label="DNI"
							defaultValue={userData.dni}
							name="dni"
							onChange={handleChange}
						/>
						<br />
					</FormControl>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeForm} color="primary">
					Cancel
				</Button>
				<Button onClick={handleSubmit} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default EditProfile;
