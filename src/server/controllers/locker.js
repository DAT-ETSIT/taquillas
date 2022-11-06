const { Op } = require('sequelize');
const models = require('../models');
const { RentalStates } = require('../constants');
const { NotFoundError } = require('../errors');

exports.model = models.Locker;

exports.index = (req, res, next) => {
	if (req.session.user.isAdmin) {
		req.options = {
			include: [
				models.Location,
				models.LockerState,
				{
					model: models.Rental,
					where: { rentalStateId: { [Op.ne]: RentalStates.RETURNED } },
					required: false,
					include: [models.User],
				},
			],
		};
	} else {
		req.options = {
			include: [
				models.Location,
				models.LockerState,
				{
					model: models.Rental,
					where: { rentalStateId: { [Op.ne]: RentalStates.RETURNED }, userId: req.session.user.id },
					required: false,
					include: [models.User],
				},
			],
		};
	}

	req.model = models.Locker;
	next();
};

exports.update = (req, res, next) => {
	req.allowedFields = ['lockerNumber', 'lockerStateId', 'locationId'];
	next();
};

exports.create = (req, res, next) => {
	req.entity = models.Locker.build(
		{
			lockerNumber: req.body.lockerNumber,
			lockerStateId: req.body.lockerStateId,
			locationId: req.body.locationId,
		},
	);
	next();
};

exports.load = (req, res, next, lockerId) => {
	models.Locker.findByPk(lockerId)
		.then((locker) => {
			if (locker) {
				req.locker = locker;
				req.entity = locker;
				return next();
			}
			throw new NotFoundError();
		})
		.catch((error) => next(error));
};
