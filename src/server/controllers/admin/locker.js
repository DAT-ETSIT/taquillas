const models = require('../../models');

exports.model = models.Locker;
exports.loadOptions = {
	include: [
		models.Location,
		models.LockerState,
		{
			model: models.Rental,
			include: [models.User],
		},
	],
};

