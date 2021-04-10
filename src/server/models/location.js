module.exports = (sequelize, DataTypes) => {
	const Location = sequelize.define('Location', {
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
	}, {});
	Location.associate = function associate(models) {
		models.Location.hasMany(models.Locker, { foreignKey: 'locationId' });
		// More associations can be defined here
	};
	return Location;
};
