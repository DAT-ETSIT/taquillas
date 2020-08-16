import {
	fetchGet, fetchPost,
	fetchDelete, fetchPut,
} from '../asyncRequests';

export const getAllPaymentMethods = () => fetchGet('/api/v1/paymentMethods')
	.then((r) => r.json());

export const createPaymentMethod = (newPaymentMethod) => fetchPost('/api/v1/paymentMethods', newPaymentMethod)
	.then((r) => r.json());

export const updatePaymentMethod = (newPaymentMethod, oldPaymentMethod) => {
	const url = `/api/v1/paymentMethods/${oldPaymentMethod.id}`;
	return fetchPut(url, newPaymentMethod)
		.then((r) => r.json());
};

export const removePaymentMethod = (paymentMethod) => {
	const url = `/api/v1/paymentMethods/${paymentMethod.id}`;
	return fetchDelete(url, {})
		.then((r) => r.json());
};
