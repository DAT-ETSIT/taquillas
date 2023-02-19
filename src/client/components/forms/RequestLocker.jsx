import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router-dom';
import { getSession } from '../../utils/api/session';
import { addRequestError } from '../../redux/actions/messages';
import store from '../../redux/store';
import requestLocker from '../../utils/api/rentals';

const { dispatch } = store;
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

function RequestLocker(props) {
	const {
		isOpen,
		location,
		closeForm,
	} = props;
	const [lockerId, setLockerId] = useState(-1);
	const [period, setPeriod] = useState('semester');
	const classes = useStyles();
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		closeForm();
		requestLocker(location.id, lockerId, period)
			.then(() => getSession())
			.then(() => history.push('/myLockers'))
			.catch((error) => dispatch(addRequestError(error)));
	};

	return (
		<Dialog disableBackdropClick disableEscapeKeyDown open={isOpen} onClose={() => closeForm()}>
			<DialogTitle>Escoge la taquilla</DialogTitle>
			<DialogContent>
				<form className={classes.container}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="demo-dialog-native">Número</InputLabel>
						<Select
							native
							value={lockerId}
							onChange={(event) => setLockerId(parseInt(event.target.value, 10))}
							input={<Input id="demo-dialog-native" />}
						>
							<option key="Cualquiera" value={-1}>Cualquiera</option>
							{location.Lockers.map(
								(locker) => (
									<option key={locker.lockerNumber} value={locker.id}>
										{locker.lockerNumber}
									</option>
								),
							)}
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="period-selector">Periodo</InputLabel>
						<Select
							native
							value={period}
							onChange={(event) => setPeriod(event.target.value)}
							input={<Input id="period-selector" />}
						>
							<option key="semester" value="semester">Cuatrimestre</option>
							<option key="year" value="year">Curso</option>
						</Select>
					</FormControl>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => closeForm()} color="primary">
					Cancel
				</Button>
				<Button onClick={handleSubmit} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default RequestLocker;
