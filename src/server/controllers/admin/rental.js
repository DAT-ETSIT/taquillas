const models = require('../../models');

exports.model = models.Rental;
exports.loadOptions = {
	include: [
		models.RentalState,
		models.User,
		{
			model: models.Locker,
			include: [models.Location],
		},
		{
			model: models.Payment,
			include: [models.User],
		},
	],
};

