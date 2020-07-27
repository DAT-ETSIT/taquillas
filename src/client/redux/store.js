import { createStore } from 'redux';
import GlobalState from './reducers';

const initalState = {
	pong: false,
	session: {},
	lockers: [],
	users: [],
	rentals: [],
	locations: [],
	payments: [],
	lockerStates: [],
	rentalStates: [],
	paymentMethods: [],
	messages: [],
};

const store = createStore(GlobalState, initalState);

export default store;
