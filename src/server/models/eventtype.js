module.exports = (sequelize, DataTypes) => {
	const EventType = sequelize.define('EventType', {
		name: DataTypes.STRING,
	}, {});
	EventType.associate = function associate(models) {
		models.EventType.hasMany(models.Event, { foreignKey: 'eventTypeId' });
		// More associations can be defined here
	};
	return EventType;
};
