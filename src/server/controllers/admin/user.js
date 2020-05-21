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

exports.update = (req, res, next) => {
	req.allowedFields = ['name', 'phone', 'dni', 'isAdmin', 'email'];
	next();
};

exports.create = (req, res, next) => {
	req.entity = models.User.build(
		{
			name: req.body.name,
			phone: req.body.phone ? req.body.phone : null,
			dni: req.body.dni ? req.body.dni : null,
			email: req.body.email,
			isAdmin: false,
		},
	);
	next();
};
