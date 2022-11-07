import {
	fetchGet, fetchPost,
	fetchPut, fetchDelete,
} from '../asyncRequests';

const requestLocker = (locationId, lockerId, period) => {
	const requestLockerUrl = `/api/v1/rentals/request/locker/${lockerId}`;
	const requestAnyUrl = `/api/v1/rentals/request/any/${locationId}`;
	const url = lockerId >= 0 ? requestLockerUrl : requestAnyUrl;
	return fetchPost(url, {period})
		.then((r) => r.json());
};

export const getAllRentals = () => fetchGet('/api/v1/rentals')
	.then((r) => r.json());

export const createRental = (newRental) => fetchPost('/api/v1/rentals', newRental)
	.then((r) => r.json());

export const updateRental = (newRental, oldRental) => {
	const url = `/api/v1/rentals/${oldRental.id}`;
	return fetchPut(url, newRental)
		.then((r) => r.json());
};

export const removeRental = (rental) => {
	const url = `/api/v1/rentals/${rental.id}`;
	return fetchDelete(url, {})
		.then((r) => r.json());
};

export const requestRenewal = (rental) => {
	const url = `/api/v1/rentals/${rental.id}/request/renewal/`;
	return fetchPost(url, rental)
		.then((r) => r.json());
};

export const claimRental = (rental) => {
	const url = `/api/v1/rentals/${rental.id}/claim`;
	return fetchPost(url, rental)
		.then((r) => r.json());
};

export const acceptRenewal = (rental) => {
	const url = `/api/v1/rentals/${rental.id}/renewal/accept`;
	return fetchPost(url, rental)
		.then((r) => r.json());
};

export const denyRenewal = (rental) => {
	const url = `/api/v1/rentals/${rental.id}/renewal/deny`;
	return fetchPost(url, rental)
		.then((r) => r.json());
};

export const endRental = (rental) => {
	const url = `/api/v1/rentals/${rental.id}/end`;
	return fetchPost(url, rental)
		.then((r) => r.json());
};

export default requestLocker;
