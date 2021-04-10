module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Payments', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		quantity: {
			type: Sequelize.DECIMAL,
			allowNull: false,
		},
		userId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'Users',
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
		rentalId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'Rentals',
				key: 'id',
			},
			onDelete: 'SET NULL',
		},
		paymentMethodId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'PaymentMethods',
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
	down: (queryInterface) => queryInterface.dropTable('Payments'),
};
