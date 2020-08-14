const models = require('../models');
const { NotFoundError } = require('../errors');

exports.model = models.Payment;

exports.load = (req, res, next, paymentId) => {
	const options = {
		include: [
			models.PaymentMethod,
			models.User,
			{
				model: models.Rental,
				include: [models.Locker],
			},
		],
	};
	return models.Payment.findByPk(paymentId, options)
		.then((payment) => {
			if (payment) {
				req.entity = payment;
				req.payment = payment;
				return next();
			}
			throw new NotFoundError();
		})
		.catch((error) => next(error));
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
			rentalId: req.body.rentalId || null,
			paymentMethodId: req.body.paymentMethodId || null,
		},
	);
	next();
};
