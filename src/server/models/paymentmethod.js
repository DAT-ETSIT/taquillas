
module.exports = (sequelize, DataTypes) => {
	const PaymentMethod = sequelize.define('PaymentMethod', {
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
	}, {});
	PaymentMethod.associate = function associate(models) {
		models.PaymentMethod.hasMany(models.Payment, { foreignKey: 'paymentMethodId' });
		// More associations can be defined here
	};
	return PaymentMethod;
};
