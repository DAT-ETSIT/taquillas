const models = require('../../models');

exports.model = models.PaymentMethod;
exports.loadOptions = {};

exports.setDefaults = (req, res, next) => {
	req.options = {};
	req.model = models.PaymentMethod;
	next();
};

exports.update = (req, res, next) => {
	req.allowedFields = ['name', 'description'];
	next();
};

