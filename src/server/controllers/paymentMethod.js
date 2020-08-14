const models = require('../models');
const { NotFoundError } = require('../errors');

exports.model = models.PaymentMethod;
exports.loadOptions = {};

exports.setDefaults = (req, res, next) => {
	req.options = {};
	req.model = models.PaymentMethod;
	next();
};

exports.load = (req, res, next, paymentMethodId) => models.PaymentMethod.findByPk(paymentMethodId)
	.then((paymentMethod) => {
		if (paymentMethod) {
			req.entity = paymentMethod;
			req.paymentMethod = paymentMethod;
			return next();
		}
		throw new NotFoundError();
	})
	.catch((error) => next(error));

exports.update = (req, res, next) => {
	req.allowedFields = ['name', 'description'];
	next();
};

exports.create = (req, res, next) => {
	req.entity = models.PaymentMethod.build(
		{
			name: req.body.name,
			description: req.body.description,
		},
	);
	next();
};
