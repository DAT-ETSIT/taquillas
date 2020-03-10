module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Rentals', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		expirationDate: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		deposit: {
			type: Sequelize.DECIMAL,
			defaultValue: 0,
			allowNull: false,
		},
		userId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'Users',
				key: 'id',
			},
			onDelete: 'SET NULL',
		},
		lockerId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'Lockers',
				key: 'id',
			},
			onDelete: 'SET NULL',
		},
		rentalStateId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'RentalStates',
				key: 'id',
			},
			onDelete: 'SET NULL',
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	}),
	down: (queryInterface) => queryInterface.dropTable('Rentals'),
};
