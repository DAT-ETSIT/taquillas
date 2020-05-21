const models = require('../../models');

exports.model = models.User;
exports.loadOptions = {
	include: [
		{
			model: models.Rental,
			include: [models.Locker],
		},
		{
			model: models.Payment,
			include: [models.Rental],
		},
	],
};

