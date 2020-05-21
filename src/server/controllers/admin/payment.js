const models = require('../../models');

exports.model = models.Payment;
exports.loadOptions = {
	include: [
		models.PaymentMethod,
		models.User,
		{
			model: models.Rental,
			include: [models.Locker],
		},
	],
};

