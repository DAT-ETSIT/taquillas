import React, { useEffect, useState } from 'react';
import { getRentalsColumns } from '../utils/tableColumns';
import { addRequestError } from '../redux/actions/messages';
import { getAllLockers } from '../utils/api/lockers';
import Table from '../components/Table';
import store from '../redux/store';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../utils/api/users';
import { getAllRentals } from '../utils/api/rentals';

const { dispatch } = store;
const MyLockers = () => {
	const [data, setData] = useState([]);
    const [lockers, setLockers] = useState([]);
    const [users, setUsers] = useState([]);
    const session = useSelector((state) => state.session);

	useEffect(() => {
		getAllLockers()
			.then((allLockers) => setLockers(allLockers))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	useEffect(() => {
		getAllRentals()
			.then((res) => setData(res))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

    useEffect(() => {
		getAllUsers()
			.then((allUsers) => setUsers(allUsers))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	const rentalsColumns = getRentalsColumns(lockers, users);

	return (
        <div> {console.log(data)}{console.log("prueba")}
		<Table
			data={data.filter(
                (rental) => rental.userId === session.user.id,
            )
        }
			title="Taquillas"
			columns={rentalsColumns}
            actions={[]}
			showEmpty
		/></div>
	);
};

export default MyLockers;
