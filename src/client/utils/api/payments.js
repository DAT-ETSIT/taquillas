import {
	fetchGet, fetchPost,
	fetchDelete, fetchPut,
} from '../asyncRequests';

export const getAllPayments = () => fetchGet('/api/v1/payments')
	.then((r) => r.json());

export const createPayment = (newPayment) => fetchPost('/api/v1/payments', newPayment)
	.then((r) => r.json());

export const updatePayment = (newPayment, oldPayment) => {
	const url = `/api/v1/payments/${oldPayment.id}`;
	return fetchPut(url, newPayment)
		.then((r) => r.json());
};

export const removePayment = (payment) => {
	const url = `/api/v1/payments/${payment.id}`;
	return fetchDelete(url, {})
		.then((r) => r.json());
};
