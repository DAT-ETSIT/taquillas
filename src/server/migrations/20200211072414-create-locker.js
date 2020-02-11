
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Lockers', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		lockerNumber: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
		},
		lockerStateId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'LockerStates',
				key: 'id',
			},
			onDelete: 'SET NULL',
		},
		locationId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'Locations',
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
	down: (queryInterface) => queryInterface.dropTable('Lockers'),
};
