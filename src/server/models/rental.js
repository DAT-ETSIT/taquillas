module.exports = (sequelize, DataTypes) => {
	const Rental = sequelize.define('Rental', {
		expirationDate: DataTypes.DATE,
		deposit: DataTypes.DECIMAL,
		userId: DataTypes.INTEGER,
		lockerId: DataTypes.INTEGER,
		rentalStateId: DataTypes.INTEGER,
	}, {});
	Rental.associate = function associate(models) {
		models.Rental.belongsTo(models.User, { foreignKey: 'userId' });
		models.Rental.belongsTo(models.Locker, { foreignKey: 'lockerId' });
		models.Rental.belongsTo(models.RentalState, { foreignKey: 'rentalStateId' });
		models.Locker.hasMany(models.Payment, { foreignKey: 'rentalId' });
		models.Locker.hasMany(models.Event, { foreignKey: 'rentalId' });
		// More associations can be defined here
	};
	return Rental;
};
