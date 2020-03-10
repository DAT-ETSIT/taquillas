
module.exports = {
	up: (queryInterface) => queryInterface.bulkInsert('LockerStates', [
		{
			name: 'Unavailable',
			description: 'Locker not available for rent',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Available',
			description: 'Locker available for rent',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Reserved',
			description: 'Locker reserved for a user',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Rented',
			description: 'Locker rented to a user',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]),


	down: (queryInterface) => queryInterface.bulkDelete('LockerStates', null, {}),
};
