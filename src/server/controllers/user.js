const { Op } = require('sequelize');
const models = require('../models');
const { BadRequestError, NotFoundError } = require('../errors');
const { RentalStates } = require('../constants');

exports.model = models.User;

exports.load = (req, res, next, userId) => {
	const options = {
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
	models.User.findByPk(userId, options)
		.then((user) => {
			if (user) {
				req.user = user;
				req.owner = user;
				req.entity = user;
				return next();
			}
			return next(new NotFoundError());
		})
		.catch((error) => next(error));
};

exports.signUp = (req, res, next) => {
	// Not logged in the CAS
	if (!req.session.email || !req.session.name) {
		return next(new BadRequestError());
	}
	// User already registered
	if (req.session.user) return next(new BadRequestError());
	return models.User.create(
		{
			name: `${req.session.name} ${req.session.surname}`,
			email: req.session.email,
			phone: req.body.phone ? req.body.phone : null,
			dni: req.body.dni ? req.body.dni : null,
			isAdmin: false,
		},
	)
		.then((user) => {
			const rawUser = {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				dni: user.dni,
				isAdmin: user.isAdmin,
			};
			req.session.user = rawUser;
			return rawUser;
		})
		.then((user) => res.json(user));
};

exports.editProfile = (req, res, next) => {
	const { body, user } = req;
	const fields = [];
	const allowedFields = ['name', 'phone', 'dni'];

	allowedFields.forEach((field) => {
		if (Object.prototype.hasOwnProperty.call(body, field)
			&& body[field] !== user[field]) {
			user[field] = body[field];
			fields.push(field);
		}
	});
	// Check if there is at least one field to update
	if (fields.length === 0) {
		throw new BadRequestError('Debes modificar al menos un campo para actualizar tu perfil');
	}

	return user.save({ fields })
		.then((updatedUser) => {
			req.result = updatedUser;
		})
		.then(() => next())
		.catch((error) => next(error));
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
			phone: req.body.phone || null,
			dni: req.body.dni || null,
			email: req.body.email,
			isAdmin: false,
		},
	);
	next();
};
