import {
	fetchGet, fetchPost,
	fetchPut, fetchDelete,
} from '../asyncRequests';
import { getSession } from './session';

export const signUp = (newUser) => fetchPost('/api/v1/users/signup', newUser)
	.then((r) => r.json())
	.then(() => getSession());

export const updateProfile = (userId, userData) => fetchPost(`/api/v1/users/${userId}/edit`, userData)
	.then((r) => r.json())
	.then(() => getSession());

export const getAllUsers = () => fetchGet('/api/v1/users')
	.then((r) => r.json());

export const createUser = (newUser) => fetchPost('/api/v1/users', newUser)
	.then((r) => r.json());

export const updateUser = (newUser, oldUser) => {
	const url = `/api/v1/users/${oldUser.id}`;
	return fetchPut(url, newUser)
		.then((r) => r.json());
};

export const removeUser = (user) => {
	const url = `/api/v1/users/${user.id}`;
	return fetchDelete(url, {})
		.then((r) => r.json());
};
