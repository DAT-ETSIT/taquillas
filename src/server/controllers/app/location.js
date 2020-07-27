const models = require('../../models');
const { LockerStates } = require('../../constants');
const { NotFoundError } = require('../../errors');

exports.load = (req, res, next, locationId) => {
	const options = {
		include: [
			{
				model: models.Locker,
				where: { lockerStateId: LockerStates.AVAILABLE },
			},
		],
	};
	models.Location.findByPk(locationId, options)
		.then((location) => {
			if (location) {
				req.location = location;
				next();
			} else {
				throw new NotFoundError();
			}
		})
		.catch((error) => next(error));
};

exports.index = (req, res, next) => {
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
