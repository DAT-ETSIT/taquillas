import React, { useEffect, useState } from 'react';
import { getRentalsColumns } from '../utils/tableColumns';
import { addRequestError } from '../redux/actions/messages';
import { getAllLockers } from '../utils/api/lockers';
import { getAllUsers } from '../utils/api/users';
import { LockerStates, RentalStates } from '../../server/constants';
import {
	getAllRentals, createRental,
	updateRental, removeRental,
	claimRental, endRental,
} from '../utils/api/rentals';
import {
	updateLocker, removeLocker,
} from '../utils/api/lockers';
import Table from '../components/Table';
import store from '../redux/store';

const { dispatch } = store;
const Rentals = () => {
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

	const create = (newRental) => createRental(newRental)
		.then((res) => setData([...data, res]))
		.catch((error) => dispatch(addRequestError(error)));

	const remove = (oldRental) => removeRental(oldRental)
		.then(() => setData(data.filter((rental) => rental.id !== oldRental.id)))
		.catch((error) => dispatch(addRequestError(error)));

	const update = (oldRental, newRental) => updateRental(oldRental, newRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));

	const claim = (oldRental) => claimRental(oldRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));

	const end = (oldRental) => endRental(oldRental)
		.then((res) => setData(
			data.map((rental) => (rental.id === res.id ? res : rental)),
		)).catch((error) => dispatch(addRequestError(error)));

	const updateLockers = (oldLocker, newLocker) => updateLocker(oldLocker, newLocker)
		.then((res) => setData(
			data.map((locker) => (locker.id === res.id ? res : locker)),
		)).catch((error) => dispatch(addRequestError(error)));

	return (
		<div>
			<Table
				data={
					data.filter(
						(rental) => rental.rentalStateId === RentalStates.RENTED,
					)
				}
				title="Préstamos activos"
				columns={rentalsColumns}
				actions={[{
					icon: 'event_bussy',
					tooltip: 'Reclamar fin de alquiler',
					onClick: (event, rental) => claim(rental),

					position: 'row',
				}]}
			/>
			<br />
			<Table
				data={
					data.filter(
						(rental) => rental.rentalStateId === RentalStates.CLAIMED,
					)
				}
				title="Préstamos pendientes de devolución de llaves"
				columns={rentalsColumns}
				actions={[{
					icon: 'vpn_key',
					tooltip: 'Finalizar alquiler',
					onClick: (event, rental) =>	{
						lockers.map((locker) => {
							if (locker.id == rental.lockerId) {
								locker.lockerStateId = LockerStates.AVAILABLE
								console.log(locker)
								console.log(rental)
								updateLockers(locker,locker)
								end(rental)
							}
						})
					},
					position: 'row',
				}]}
			/>
			<br />
			<Table
				data={data}
				title="Todos los préstamos (Histórico)"
				columns={rentalsColumns}
				create={create}
				update={update}
				remove={remove}
				actions={[]}
				editable
				showEmpty
			/>
		</div>

	);
};

export default Rentals;
