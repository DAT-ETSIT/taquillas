module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: DataTypes.STRING,
		phone: DataTypes.STRING,
		dni: DataTypes.STRING,
		email: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN,
	}, {});
	User.associate = function associate(models) {
		models.User.hasMany(models.Event, { foreignKey: 'userId' });
		models.User.hasMany(models.Rental, { foreignKey: 'userId' });
		models.User.hasMany(models.Payment, { foreignKey: 'userId' });
		// More associations can be defined here
	};
	return User;
};
