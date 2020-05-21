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

exports.index = (req, res, next) => {
	req.options = {
		include: [
			models.PaymentMethod,
			models.User,
			{
				model: models.Rental,
				include: [models.Locker],
			},
		],
	};
	req.model = models.Payment;
	next();
};

