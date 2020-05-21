const { Op } = require('sequelize');
const models = require('../../models');
const { RentalStates } = require('../../constants');

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

exports.index = (req, res, next) => {
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
	req.model = models.Locker;
	next();
};

exports.update = (req, res, next) => {
	req.allowedFields = ['lockerNumber', 'lockerStateId', 'locaitonId'];
	next();
};

