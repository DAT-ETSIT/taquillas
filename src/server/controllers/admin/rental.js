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

exports.startRental = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.RESERVED) {
		return next(new BadRequestError('No puedes iniciar un alquiler que no haya sido previamente aceptado por un administrador'));
	}
	if (req.entity.Locker.lockerStateId !== LockerStates.RESERVED) {
		return next(new BadRequestError('No puedes iniciar un alquiler con una taquilla que no se encuentre reservada previamente'));
	}
	const includesDeposit = parseInt(req.body.includesDeposit, 10) === 1;
	const rentalPayment = models.Payment.build(
		{
			quantity: parseFloat(req.body.rentalCost),
			userId: req.entity.User.id,
			rentalId: req.entity.id,
			paymentMethodId: req.body.paymentMethodId,
		},
	);

	return rentalPayment.save()
		.then(() => {
			if (includesDeposit) {
				const depositPayment = models.Payment.build(
					{
						quantity: parseFloat(req.body.depositCost),
						userId: req.entity.User.id,
						rentalId: req.entity.id,
						paymentMethodId: req.body.paymentMethodId,
					},
				);
				return depositPayment.save();
			}
			return null;
		})
		.then(() => req.entity.Locker.update({ lockerStateId: LockerStates.RENTED }))
		.then(() => req.entity.update({
			rentalStateId: RentalStates.RENTED,
			deposit: (req.includesDeposit
				? req.entity.deposit + parseFloat(req.body.depositCost)
				: req.entity.deposit),
		}))
		.then((rental) => rental.reload())
		.then((rental) => res.json(rental));
};

exports.claimRental = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.RENTED) {
		return next(new BadRequestError('No puedes reclamar la finalización de un alquiler que no está en curso'));
	}
	return req.entity.update({ rentalStateId: RentalStates.CLAIMED })
		.then((rental) => rental.reload())
		.then((rental) => res.json(rental));
};