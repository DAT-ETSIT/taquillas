module.exports = (sequelize, DataTypes) => {
	const LockerState = sequelize.define('LockerState', {
		id: { type: DataTypes.INTEGER, autoIncrement: false, primaryKey: true },
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
	}, {});
	LockerState.associate = function associate(models) {
		models.LockerState.hasMany(models.Locker, { foreignKey: 'lockerStateId' });
		// More associations can be defined here
	};
	return LockerState;
};
