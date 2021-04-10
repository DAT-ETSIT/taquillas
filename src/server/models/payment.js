module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define('Payment', {
		quantity: DataTypes.DECIMAL,
		userId: DataTypes.INTEGER,
		rentalId: DataTypes.INTEGER,
		paymentMethodId: DataTypes.INTEGER,
	}, {});
	Payment.associate = function associate(models) {
		models.Payment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
		models.Payment.belongsTo(models.Rental, { foreignKey: 'rentalId' });
		models.Payment.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
		models.Payment.hasMany(models.Event, { foreignKey: 'paymentId' });
		// More associations can be defined here
	};
	return Payment;
};
