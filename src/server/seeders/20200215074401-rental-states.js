
module.exports = {
	up: (queryInterface) => queryInterface.bulkInsert('RentalStates', [
		{
			name: 'Requested',
			description: 'The user has requested a locker. Petition pending approval by administrators.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Reserved',
			description: 'The administration has approved the request. The user has to pay the deposit and the price of the locker.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Rented',
			description: 'Rental is active until the expiration date.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Claimed',
			description: 'The administration claimed the return of the keys in order to end the rental.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Renew requested',
			description: 'The user has requested the renewal of the rental.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'Returned',
			description: 'The rental of the locker is over, the keys and the deposit have been returned.',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]),


	down: (queryInterface) => queryInterface.bulkDelete('RentalStates', null, {}),
};
