module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define('Event', {
		description: DataTypes.TEXT,
		eventTypeId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER,
		lockerId: DataTypes.INTEGER,
		paymentId: DataTypes.INTEGER,
		rentalId: DataTypes.INTEGER,
	}, {});
	Event.associate = function associate(models) {
		models.Event.belongsTo(models.EventType, { foreignKey: 'eventTypeId' });
		models.Event.belongsTo(models.User, { foreignKey: 'userId' });
		models.Event.belongsTo(models.Locker, { foreignKey: 'lockerId' });
		models.Event.belongsTo(models.Rental, { foreignKey: 'rentalId' });
		models.Event.belongsTo(models.Payment, { foreignKey: 'paymentId' });
		// More associations can be defined here
	};
	return Event;
};
