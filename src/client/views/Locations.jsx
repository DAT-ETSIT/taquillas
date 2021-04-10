import React, { useEffect, useState } from 'react';
import { locationsColumns } from '../utils/tableColumns';
import {
	getAllLocations, createLocation,
	updateLocation, removeLocation,
} from '../utils/api/locations';
import Table from '../components/Table';
import store from '../redux/store';
import { addRequestError } from '../redux/actions/messages';

const { dispatch } = store;
const Locations = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		getAllLocations()
			.then((locations) => setData(locations))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	const create = (newLocation) => createLocation(newLocation)
		.then((res) => setData([...data, res]))
		.catch((error) => dispatch(addRequestError(error)));

	const remove = (oldLocation) => removeLocation(oldLocation)
		.then(() => setData(data.filter((location) => location.id !== oldLocation.id)))
		.catch((error) => dispatch(addRequestError(error)));

	const update = (oldLocation, newLocation) => updateLocation(oldLocation, newLocation)
		.then((res) => setData(
			data.map((location) => (location.id === res.id ? res : location)),
		)).catch((error) => dispatch(addRequestError(error)));

	return (
		<Table
			data={data}
			title="Ubicaciones"
			columns={locationsColumns}
			create={create}
			update={update}
			remove={remove}
			actions={[]}
			editable
			showEmpty
		/>

	);
};

export default Locations;
