module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		dni: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		isAdmin: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
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
	down: (queryInterface) => queryInterface.dropTable('Users'),
};
