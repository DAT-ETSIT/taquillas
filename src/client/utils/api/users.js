import { fetchPost } from '../asyncRequests';
import { getSession } from './app/session';

export const createUser = (newUser) => fetchPost('/api/v1/users/signup', newUser)
	.then((r) => r.json())
	.then(() => getSession());

export const updateUser = (userId, userData) => fetchPost(`/api/v1/users/${userId}/edit`, userData)
	.then((r) => r.json())
	.then(() => getSession());
