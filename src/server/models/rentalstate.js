module.exports = (sequelize, DataTypes) => {
	const RentalState = sequelize.define('RentalState', {
		id: { type: DataTypes.INTEGER, autoIncrement: false, primaryKey: true },
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
	}, {});
	RentalState.associate = function associate(models) {
		models.RentalState.hasMany(models.Rental, { foreignKey: 'rentalStateId' });
		// More associations can be defined here
	};
	return RentalState;
};
