const models = require('../../models');
const { RentalStates, LockerStates } = require('../../constants');
const { BadRequestError } = require('../../errors');

exports.model = models.Rental;
exports.loadOptions = {
	include: [
		models.RentalState,
		models.User,
		models.Payment,
		{
			model: models.Locker,
			include: [models.Location],
		},
	],
};

exports.index = (req, res, next) => {
	req.options = {
		include: [
			models.RentalState,
			models.User,
			{
				model: models.Locker,
				include: [models.Location],
			},
		],
	};
	req.model = models.Rental;
	next();
};

exports.update = (req, res, next) => {
	req.allowedFields = ['expirationDate', 'deposit', 'userId', 'lockerId', 'rentalStateId'];
	next();
};

exports.create = (req, res, next) => {
	req.entity = models.Rental.build(
		{
			expirationDate: req.body.expirationDate || Date.now(),
			deposit: req.body.deposit,
			userId: req.body.userId,
			lockerId: req.body.lockerId,
			rentalStateId: req.body.rentalStateId || RentalStates.REQUESTED,
		},
	);
	next();
};

exports.acceptRequest = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.REQUESTED) {
		return next(new BadRequestError('No se puede aceptar una solicitud de un alquiler que no se encuentre en estado "Solicitado"'));
	}
	return req.entity.update({ rentalStateId: RentalStates.RESERVED })
		.then((rental) => rental.reload())
		.then((rental) => res.json(rental));
};

exports.denyRequest = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.REQUESTED) {
		return next(new BadRequestError('No puedes denegar una solicitud de un alquiler que no se encuentre en estado "Solicitado"'));
	}
	return req.entity.Locker.update({ lockerStateId: LockerStates.AVAILABLE })
		.then(() => req.entity.update({ rentalStateId: RentalStates.RETURNED }))
		.then((rental) => rental.reload())
		.then((rental) => res.json(rental));
};
