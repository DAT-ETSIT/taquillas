module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		description: {
			type: Sequelize.TEXT,
		},
		eventTypeId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'EventTypes',
				key: 'id',
			},
			onDelete: 'SET NULL',
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
		paymentId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'Payments',
				key: 'id',
			},
			onDelete: 'SET NULL',
		},
		rentalId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'Rentals',
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
	down: (queryInterface) => queryInterface.dropTable('Events'),
};
