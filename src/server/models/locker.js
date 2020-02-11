
module.exports = (sequelize, DataTypes) => {
	const Locker = sequelize.define('Locker', {
		lockerNumber: DataTypes.INTEGER,
		lockerStateId: DataTypes.INTEGER,
		locationId: DataTypes.INTEGER,
	}, {});
	Locker.associate = function associate(models) {
		models.Locker.belongsTo(models.LockerState, { foreignKey: 'lockerStateId' });
		models.Locker.belongsTo(models.Location, { foreignKey: 'locationId' });
		models.Locker.hasMany(models.Event, { foreignKey: 'lockerId' });
		models.Locker.hasMany(models.Rental, { foreignKey: 'lockerId' });
		// More associations can be defined here
	};
	return Locker;
};
