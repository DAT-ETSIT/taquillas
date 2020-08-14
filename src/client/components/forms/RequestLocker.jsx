import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom';
import { getSession } from '../../utils/api/session';
import { addRequestError } from '../../redux/actions/messages';
import store from '../../redux/store';
import requestLocker from '../../utils/api/rentals';
// import './styles.css';

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

const RequestLocker = (props) => {
	const {
		isOpen,
		location,
		closeForm,
	} = props;
	const [lockerId, setLockerId] = useState(-1);
	const classes = useStyles();
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		closeForm();
		requestLocker(location.id, lockerId)
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
};

export default RequestLocker;
