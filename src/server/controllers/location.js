const models = require('../models');
const { LockerStates } = require('../constants');
const { NotFoundError } = require('../errors');

exports.model = models.Location;
exports.loadOptions = {};

exports.setDefaults = (req, res, next) => {
	req.options = {};
	req.model = models.Location;
	next();
};

exports.load = (req, res, next, locationId) => models.Location.findByPk(locationId)
	.then((location) => {
		if (location) {
			req.entity = location;
			req.location = location;
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
	req.entity = models.Location.build(
		{
			name: req.body.name,
			description: req.body.description,
		},
	);
	next();
};

exports.available = (req, res, next) => {
	req.options = {
		include: [
			{
				model: models.Locker,
				where: { lockerStateId: LockerStates.AVAILABLE },
			},
		],
	};
	req.model = models.Location;
	next();
};
