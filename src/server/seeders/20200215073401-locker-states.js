const { LockerStates } = require('../constants');

module.exports = {
	up: (queryInterface) => queryInterface.bulkInsert('LockerStates', [
		{
			id: LockerStates.UNAVAILABLE,
			name: 'Unavailable',
			description: 'Locker not available for rent',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: LockerStates.AVAILABLE,
			name: 'Available',
			description: 'Locker available for rent',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: LockerStates.RESERVED,
			name: 'Reserved',
			description: 'Locker reserved for a user',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: LockerStates.RENTED,
			name: 'Rented',
			description: 'Locker rented to a user',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]),


	down: (queryInterface) => queryInterface.bulkDelete('LockerStates', null, {}),
};
