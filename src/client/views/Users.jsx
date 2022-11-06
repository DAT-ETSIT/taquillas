import React, { useEffect, useState } from 'react';
import { usersColumns } from '../utils/tableColumns';
import {
	getAllUsers, createUser,
	updateUser, removeUser,
} from '../utils/api/users';
import Table from '../components/Table';
import store from '../redux/store';
import { addRequestError } from '../redux/actions/messages';

const { dispatch } = store;
const Users = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		getAllUsers()
			.then((users) => setData(users))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	const create = (newUser) => createUser(newUser)
		.then((res) => setData([...data, res]))
		.catch((error) => dispatch(addRequestError(error)));

	const remove = (oldUser) => removeUser(oldUser)
		.then(() => setData(data.filter((user) => user.id !== oldUser.id)))
		.catch((error) => dispatch(addRequestError(error)));

	const update = (oldUser, newUser) => updateUser(oldUser, newUser)
		.then((res) => setData(
			data.map((user) => (user.id === res.id ? res : user)),
		)).catch((error) => dispatch(addRequestError(error)));
	return (
		<div>
			<Table
				data={data.filter((user) => user.isAdmin)}
				title="Administradores"
				columns={usersColumns}
				create={create}
				update={update}
				remove={remove}
				actions={[]}
				editable
				showEmpty
			/>
			<br />
			<br />
			<Table
				data={data}
				title="Usuarios"
				columns={usersColumns}
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

export default Users;
