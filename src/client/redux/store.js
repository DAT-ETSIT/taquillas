import { createStore } from 'redux';
import GlobalState from './reducers';

const initalState = {
	pong: false,
	loggedUser: { isAdmin: true, name: 'Usuario' },
	lockers: [],
	users: [],
	rentals: [],
	locations: [],
	payments: [],
	payment: [],
	lockerStates: [],
	rentalStates: [],
	paymentMethods: [],
};

const store = createStore(GlobalState, initalState);

export default store;
