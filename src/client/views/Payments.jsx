import React, { useEffect, useState } from 'react';
import { paymentsColumns, paymentMethodsColumns } from '../utils/tableColumns';
import {
	getAllPayments, createPayment,
	updatePayment, removePayment,
} from '../utils/api/payments';
import {
	getAllPaymentMethods, createPaymentMethod,
	updatePaymentMethod, removePaymentMethod,
} from '../utils/api/paymentMethods';
import Table from '../components/Table';
import store from '../redux/store';
import { addRequestError } from '../redux/actions/messages';

const { dispatch } = store;
const Payments = () => {
	const [allPayments, setAllPayments] = useState([]);
	const [allPaymentMethods, setAllPaymentMethods] = useState([]);
	useEffect(() => {
		getAllPayments()
			.then((payments) => setAllPayments(payments))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);
	useEffect(() => {
		getAllPaymentMethods()
			.then((paymentMethods) => setAllPaymentMethods(paymentMethods))
			.catch((error) => dispatch(addRequestError(error)));
	}, []);

	const createPaymentHandler = (newPayment) => createPayment(newPayment)
		.then((res) => setAllPayments([...allPayments, res]))
		.catch((error) => dispatch(addRequestError(error)));

	const removePaymentHandler = (oldPayment) => removePayment(oldPayment)
		.then(() => setAllPayments(allPayments.filter((payment) => payment.id !== oldPayment.id)))
		.catch((error) => dispatch(addRequestError(error)));

	const updatePaymentHandler = (oldPayment, newPayment) => updatePayment(oldPayment, newPayment)
		.then((res) => setAllPayments(
			allPayments.map((payment) => (payment.id === res.id ? res : payment)),
		)).catch((error) => dispatch(addRequestError(error)));

	const createPaymentMethodHandler = (newPaymentMethod) => createPaymentMethod(newPaymentMethod)
		.then((res) => setAllPaymentMethods([...allPaymentMethods, res]))
		.catch((error) => dispatch(addRequestError(error)));

	const removePaymentMethodHandler = (oldPaymentMethod) => removePaymentMethod(oldPaymentMethod)
		.then(() => setAllPaymentMethods(
			allPaymentMethods.filter((paymentMethod) => paymentMethod.id !== oldPaymentMethod.id),
		)).catch((error) => dispatch(addRequestError(error)));

	const updatePaymentMethodHandler = (oldPaymentMethod, newPaymentMethod) => updatePaymentMethod(
		oldPaymentMethod, newPaymentMethod,
	).then((res) => setAllPaymentMethods(
		allPaymentMethods.map((paymentMethod) => (paymentMethod.id === res.id ? res : paymentMethod)),
	)).catch((error) => dispatch(addRequestError(error)));

	return (
		<div>
			<Table
				data={allPaymentMethods}
				title="Métodos de pago"
				columns={paymentMethodsColumns}
				create={createPaymentMethodHandler}
				update={updatePaymentMethodHandler}
				remove={removePaymentMethodHandler}
				actions={[]}
				editable
				showEmpty
			/>
			<br />
			<br />
			<Table
				data={allPayments}
				title="Pagos"
				columns={paymentsColumns}
				create={createPaymentHandler}
				update={updatePaymentHandler}
				remove={removePaymentHandler}
				actions={[]}
				editable
				showEmpty
			/>
		</div>
	);
};

export default Payments;
