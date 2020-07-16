
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Sessions',
		{
			sid: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			expires: {
				type: Sequelize.DATE,
			},
			data: {
				type: Sequelize.STRING(10000),
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		},
		{
			sync: { force: true },
		}),

	down: (queryInterface) => queryInterface.dropTable('Sessions'),
};
