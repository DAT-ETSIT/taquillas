
module.exports = (sequelize, DataTypes) => {
	const LockerState = sequelize.define('LockerState', {
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
	}, {});
	LockerState.associate = function associate(models) {
		models.LockerState.hasMany(models.Locker, { foreignKey: 'lockerStateId' });
		// More associations can be defined here
	};
	return LockerState;
};
