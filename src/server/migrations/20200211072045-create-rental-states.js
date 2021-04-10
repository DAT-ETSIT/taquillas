module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('RentalStates', {
		id: {
			allowNull: false,
			autoIncrement: false,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false,
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
	down: (queryInterface) => queryInterface.dropTable('RentalStates'),
};
