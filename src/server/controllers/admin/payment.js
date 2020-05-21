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

exports.update = (req, res, next) => {
	req.allowedFields = ['quantity', 'userId', 'rentalId', 'paymentMethodId'];
	next();
};

exports.create = (req, res, next) => {
	req.entity = models.Payment.build(
		{
			quantity: req.body.quantity,
			userId: req.body.userId,
			rentalId: req.body.rentalId ? req.body.rentalId : null,
			paymentMethodId: req.body.paymentMethodId ? req.body.paymentMethodId : null,
		},
	);
	next();
};
