import { combineReducers } from 'redux';

function pong(state = false, action = {}) {
	switch (action.type) {
	case 'PONG':
		return true;
	default:
		return state;
	}
}

function session(state = {}, action = {}) {
	switch (action.type) {
	case 'SET_SESSION':
		return action.payload.session;
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

function messages(state = [], action = {}) {
	switch (action.type) {
	case 'ADD_MESSAGE':
		return [...state, action.payload.message];
	case 'REMOVE_MESSAGE':
		return state.slice(1);
	default:
		return state;
	}
}

const GlobalState = (combineReducers({
	pong,
	session,
	lockers,
	users,
	rentals,
	locations,
	payments,
	lockerStates,
	rentalStates,
	paymentMethods,
	messages,
}));

export default GlobalState;
