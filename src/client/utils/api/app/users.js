import { fetchPost } from '../../asyncRequests';
import { getSession } from './session';

export const createUser = (newUser) => fetchPost('/api/v1/app/user', newUser)
	.then((r) => r.json())
	.then(() => getSession());

export const updateUser = (userId, userData) => fetchPost(`/api/v1/app/user/${userId}`, userData)
	.then((r) => r.json())
	.then(() => getSession());
