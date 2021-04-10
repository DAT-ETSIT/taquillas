const { RentalStates } = require('../constants');

module.exports = {
	up: (queryInterface) => queryInterface.bulkInsert('RentalStates', [
		{
			id: RentalStates.REQUESTED,
			name: 'Requested',
			description: 'The user has requested a locker. The user has to pay the deposit and the price of the locker.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: RentalStates.RENTED,
			name: 'Rented',
			description: 'Rental is active until the expiration date.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: RentalStates.CLAIMED,
			name: 'Claimed',
			description: 'The administration claimed the return of the keys in order to end the rental.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: RentalStates.RENEWAL_REQUESTED,
			name: 'Renewal requested',
			description: 'The user has requested the renewal of the rental.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: RentalStates.RETURNED,
			name: 'Returned',
			description: 'The rental of the locker is over, the keys and the deposit have been returned.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]),

	down: (queryInterface) => queryInterface.bulkDelete('RentalStates', null, {}),
};
