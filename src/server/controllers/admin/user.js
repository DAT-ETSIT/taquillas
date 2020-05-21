const { Op } = require('sequelize');
const models = require('../../models');
const { RentalStates } = require('../../constants');

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

exports.index = (req, res, next) => {
	req.options = {
		include: [
			{
				model: models.Rental,
				where: { rentalStateId: { [Op.ne]: RentalStates.RETURNED } },
				required: false,
				include: [models.Locker],
			},
		],
	};
	req.model = models.User;
	next();
};

