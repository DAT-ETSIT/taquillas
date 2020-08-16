import {
	fetchGet, fetchPost,
	fetchDelete, fetchPut,
} from '../asyncRequests';

export const getAllLockers = () => fetchGet('/api/v1/lockers')
	.then((r) => r.json());

export const createLocker = (newLocker) => fetchPost('/api/v1/lockers', newLocker)
	.then((r) => r.json());

export const updateLocker = (newLocker, oldLocker) => {
	const url = `/api/v1/lockers/${oldLocker.id}`;
	return fetchPut(url, newLocker)
		.then((r) => r.json());
};

export const removeLocker = (locker) => {
	const url = `/api/v1/lockers/${locker.id}`;
	return fetchDelete(url, {})
		.then((r) => r.json());
};
