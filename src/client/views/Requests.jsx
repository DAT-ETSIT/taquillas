import React, { useEffect, useState } from 'react';
import { getRentalsColumns } from '../utils/tableColumns';
import { addRequestError } from '../redux/actions/messages';
import { getAllLockers } from '../utils/api/lockers';
import { getAllUsers } from '../utils/api/users';
import { LockerStates, RentalStates } from '../../server/constants';
import {
	getAllRentals, endRental,
	acceptRenewal, denyRenewal, updateRental,
} from '../utils/api/rentals';
import {
	updateLocker, removeLocker,
} from '../utils/api/lockers';
import Table from '../components/Table';
import store from '../redux/store';
import locker from '../../server/models/locker';

const { dispatch } = store;

const Requests = () => {
	const [data, setData] = useState([]);
	const [lockers, setLockers] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllRentals()
			.then((res) => setData(res))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	useEffect(() => {
		getAllLockers()
			.then((allLockers) => setLockers(allLockers))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	useEffect(() => {
		getAllUsers()
			.then((allUsers) => setUsers(allUsers))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	const rentalsColumns = getRentalsColumns(lockers, users);

	const end = (oldRental) => endRental(oldRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));

	const acceptRenewalHandler = (oldRental) => acceptRenewal(oldRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));

	const denyRenewalHandler = (oldRental) => denyRenewal(oldRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));

	const declineRental = (oldRental) => endRental(oldRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));

	const updateLockers = (oldLocker, newLocker) => updateLocker(oldLocker, newLocker)
		.then((res) => setData(
			data.map((locker) => (locker.id === res.id ? res : locker)),
		)).catch((error) => dispatch(addRequestError(error)));

	const updateRentals = (oldRental, newRental) => updateRental(oldRental, newRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));


	return (
		<div>
			<Table
				data={
					data.filter(
						(rental) => rental.rentalStateId === RentalStates.REQUESTED,
					)
				}
				title="Solicitudes pendientes de pago"
				columns={rentalsColumns}
				actions={[
					{
						icon: 'euro',
						tooltip: 'Pagar y comenzar préstamo',
						onClick: (event, rental) => {
							if (confirm("Confirmas el pago de la taquilla " + rental.Locker.lockerNumber + ".") == true) {
								let locker = lockers.find(l => l.lockerNumber === rental.Locker.lockerNumber)
								locker.lockerStateId = LockerStates.RENTED
								updateLocker(locker, locker)

								rental.rentalStateId = RentalStates.RENTED
								rental.deposit = 5
								updateRentals(rental, rental)
							}
						},
						position: 'row',
					},
					{
						icon: 'clear',
						tooltip: 'Rechazar y terminar préstamo',
						onClick: (event, rental) => {
							if (confirm("Seguro que quiere eliminar esta petición?") == true) {
								{
									let locker = lockers.find(l => l.lockerNumber === rental.Locker.lockerNumber)
									locker.lockerStateId = LockerStates.AVAILABLE
									updateLocker(locker, locker)
									end(rental)
								}
							}
						},
						position: 'row',
					},
				]}
			/>
			<br />
			<Table
				data={
					data.filter(
						(rental) => rental.rentalStateId === RentalStates.RENEWAL_REQUESTED,
					)
				}
				title="Solicitudes de renovación de préstamo"
				columns={rentalsColumns}
				actions={[
					{
						icon: 'done',
						tooltip: 'Aceptar renovación del préstamo',
						onClick: (event, rental) => acceptRenewalHandler(rental),
						position: 'row',
					},
					{
						icon: 'clear',
						tooltip: 'Rechazar renovación del préstamo',
						onClick: (event, rental) => denyRenewalHandler(rental),
						position: 'row',
					},
				]}
			/>
		</div>

	);
};

export default Requests;
