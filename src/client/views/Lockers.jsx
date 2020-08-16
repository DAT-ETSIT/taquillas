import React, { useEffect, useState } from 'react';
import { getLockersColumns } from '../utils/tableColumns';
import { addRequestError } from '../redux/actions/messages';
import { getAllLocations } from '../utils/api/locations';
import {
	getAllLockers, createLocker,
	updateLocker, removeLocker,
} from '../utils/api/lockers';
import Table from '../components/Table';
import store from '../redux/store';

const { dispatch } = store;
const Lockers = () => {
	const [data, setData] = useState([]);
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		getAllLocations()
			.then((res) => setLocations(res))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	useEffect(() => {
		getAllLockers()
			.then((lockers) => setData(lockers))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	const lockersColumns = getLockersColumns(locations);

	const create = (newLocker) => createLocker(newLocker)
		.then((res) => setData([...data, res]))
		.catch((error) => dispatch(addRequestError(error)));

	const remove = (oldLocker) => removeLocker(oldLocker)
		.then(() => setData(data.filter((locker) => locker.id !== oldLocker.id)))
		.catch((error) => dispatch(addRequestError(error)));

	const update = (oldLocker, newLocker) => updateLocker(oldLocker, newLocker)
		.then((res) => setData(
			data.map((locker) => (locker.id === res.id ? res : locker)),
		)).catch((error) => dispatch(addRequestError(error)));

	return (
		<Table
			data={data}
			title="Taquillas"
			columns={lockersColumns}
			create={create}
			update={update}
			remove={remove}
			actions={[]}
			editable
			showEmpty
		/>

	);
};

export default Lockers;
