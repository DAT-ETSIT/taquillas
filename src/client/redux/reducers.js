import { combineReducers } from 'redux';

function pong(state = false, action = {}) {
	switch (action.type) {
	case 'PONG':
		return true;
	default:
		return state;
	}
}

function loggedUser(state = {}, action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function lockers(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function users(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function rentals(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function locations(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function payments(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function payment(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function lockerStates(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function rentalStates(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

function paymentMethods(state = [], action = {}) {
	switch (action.type) {
	default:
		return state;
	}
}

const GlobalState = (combineReducers({
	pong,
	loggedUser,
	lockers,
	users,
	rentals,
	locations,
	payments,
	payment,
	lockerStates,
	rentalStates,
	paymentMethods,
}));

export default GlobalState;
