// Definition of the Session model:

module.exports = (sequelize, DataTypes) => {
	const Session = sequelize.define(
		'Session',
		{
			sid: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			expires: {
				type: DataTypes.DATE,
			},
			data: {
				type: DataTypes.STRING(50000),
			},
		},
	);
	Session.associate = function associate() {
		// Associations can be defined here
	};
	return Session;
};
