import { LockerStates, RentalStates } from '../../server/constants';

// Common
const id = {
	field: 'id',
	title: 'ID',
	editable: 'never',
	width: 100,
};
const name = {
	field: 'name',
	title: 'Nombre',
	width: 200,
};

const description = {
	field: 'description',
	title: 'Descripción',
	cellStyle: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		maxWidth: 100,
	},
};
const createdAt = {
	field: 'createdAt',
	title: 'Fecha de Creación',
	type: 'datetime',
	editable: 'never',
	filtering: false,
	cellStyle: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		maxWidth: 100,
	},
};
const updatedAt = {
	field: 'updatedAt',
	title: 'Última modificación',
	type: 'datetime',
	editable: 'never',
	filtering: false,
	cellStyle: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		maxWidth: 100,
	},
};

// Const
const lockerState = {
	field: 'lockerStateId',
	title: 'Estado',
	width: 200,
	type: 'numeric',
	lookup: {
		[LockerStates.UNAVAILABLE]: 'No Disponible',
		[LockerStates.AVAILABLE]: 'Disponible',
		[LockerStates.RESERVED]: 'Reservada',
		[LockerStates.RENTED]: 'Alquilada',
	},
};
const rentalState = {
	field: 'rentalStateId',
	title: 'Estado',
	width: 200,
	editable: 'onUpdate',
	type: 'numeric',
	lookup: {
		[RentalStates.REQUESTED]: 'Solicitud enviada',
		[RentalStates.RENTED]: 'Alquiler en curso',
		[RentalStates.CLAIMED]: 'Alquiler expirado, llaves pendientes de devolución',
		[RentalStates.RENEWAL_REQUESTED]: 'Renovación solicitada',
		[RentalStates.RETURNED]: 'Alquiler finalizado',

	},
};

// Lockers
const lockerNumber = {
	field: 'lockerNumber',
	title: 'Nº',
	type: 'numeric',
	width: 100,
};
const location = {
	field: 'locationId',
	title: 'Ubicación',
	width: 200,
	lookup: {},
};

// Users
const phone = {
	field: 'phone',
	title: 'Teléfono',
};
const dni = {
	field: 'dni',
	title: 'DNI',
};
const email = {
	field: 'email',
	title: 'E-Mail',
};
const isAdmin = {
	field: 'isAdmin',
	title: 'Administrador',
	type: 'boolean',
	editable: 'onUpdate',
};

// Rentals:
const deposit = {
	field: 'deposit',
	title: 'Fianza',
	type: 'currency',
};

const lockerLocation = {
	field: 'Locker.Location.name',
	title: 'Ubicación',
	editable: 'never',
};

const userDNI = {
	field: 'User.dni',
	title: 'DNI',
	editable: 'never',
};
const lockerId = {
	field: 'lockerId',
	title: 'Taquilla',
	lookup: {},
};
const userId = {
	field: 'userId',
	title: 'E-Mail',
	lookup: {},
};

// Payments
const rentalId = {
	field: 'rentalId',
	title: 'Rental Id',
};

const quantity = {
	field: 'quantity',
	title: 'Cantidad',
	type: 'currency',
};

const paymentMethod = {
	field: 'PaymentMethod.name',
	title: 'Método de pago',
};

const userEmail = {
	field: 'User.email',
	title: 'E-Mail',
};

export const locationsColumns = [id, name, description];
export const paymentMethodsColumns = [id, name, description];
export const usersColumns = [id, name, phone, dni, email, isAdmin, createdAt, updatedAt];
export const paymentsColumns = [userDNI, userEmail, rentalId, quantity, paymentMethod, createdAt];

export const getLockersColumns = (locations) => {
	const lookup = locations.reduce((data, _location) => (
		{ ...data, [_location.id]: _location.name }
	), {});

	const columns = [lockerNumber, { ...location, lookup }, lockerState, createdAt, updatedAt];
	return columns;
};

export const getRentalsColumns = (lockers, users) => {
	const lockersLookup = lockers.reduce((data, locker) => (
		{ ...data, [locker.id]: locker.lockerNumber }
	), {});

	const usersLookup = users.reduce((data, user) => (
		{ ...data, [user.id]: user.email }
	), {});

	const columns = [
		id,
		{ ...userId, lookup: usersLookup },
		{ ...lockerId, lookup: lockersLookup },
		deposit,
		rentalState,
		userDNI,
		lockerLocation,
	];
	return columns;
};
