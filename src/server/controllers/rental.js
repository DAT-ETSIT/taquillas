const models = require('../models');
const { LockerStates, RentalStates, MAX_RENTALS } = require('../constants');
const { NotFoundError, BadRequestError, LimitedUserError } = require('../errors');

exports.model = models.Rental;

exports.load = (req, res, next, rentalId) => {
	const options = {
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
	models.Rental.findByPk(rentalId, options)
		.then((rental) => {
			if (rental) {
				req.rental = rental;
				req.entity = rental;
				req.owner = rental.User;
				next();
			} else {
				next(new NotFoundError());
			}
		})
		.catch((error) => next(error));
};

exports.requestLocker = (req, res, next) => {
	// If locker not available
	if (req.locker.lockerStateId !== LockerStates.AVAILABLE) {
		return next(new BadRequestError('La taquilla solicitada no se encuentra disponible'));
	}
	// If user with more than 5 active rentals
	if (req.session.user.Rentals && req.session.user.Rentals.length >= MAX_RENTALS) {
		return next(new LimitedUserError(`No puedes tener mas de ${MAX_RENTALS} alquileres activos`));
	}
	// req.locker.lockerStateId = LockerStates.RESERVED;
	return req.locker.update({ lockerStateId: LockerStates.RESERVED })
		.then((locker) => models.Rental.create(
			{
				expirationDate: Date.now(), // Deprecated?
				deposit: 0,
				userId: req.session.user.id,
				lockerId: locker.id,
				rentalStateId: RentalStates.REQUESTED,
			},
		)).then((rental) => {
			req.result = rental;
			next();
		});
};

exports.requestRandomLocker = (req, res, next) => {
	// If user with more than x active rentals
	if (req.session.user.Rentals && req.session.user.Rentals.length >= MAX_RENTALS) {
		return next(new LimitedUserError(`No puedes tener mas de ${MAX_RENTALS} alquileres activos`));
	}
	const options = {
		where: {
			locationId: req.location.id,
			lockerStateId: LockerStates.AVAILABLE,
		},
	};

	return models.Locker.findOne(options)
		.then((locker) => locker.update({ lockerStateId: LockerStates.RESERVED }))
		.then((locker) => models.Rental.create(
			{
				expirationDate: Date.now(), // Deprecated?
				deposit: 0,
				userId: req.session.user.id,
				lockerId: locker.id,
				rentalStateId: RentalStates.REQUESTED,
			},
		)).then((rental) => {
			req.result = rental;
			return next();
		});
};

exports.requestRenewal = (req, res, next) => {
	if (req.rental.rentalStateId !== RentalStates.CLAIMED) {
		return next(new BadRequestError('No puedes pedir renovación de esta taquilla'));
	}
	return req.rental.update({ rentalStateId: RentalStates.RENEWAL_REQUESTED })
		.then((rental) => {
			req.result = rental;
			return next();
		});
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

exports.startRental = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.REQUESTED) {
		return next(new BadRequestError('No puedes iniciar un alquiler que no haya sido solicitado previamente'));
	}
	if (req.entity.Locker.lockerStateId !== LockerStates.REQUESTED) {
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

exports.acceptRenewal = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.RENEWAL_REQUESTED) {
		return next(new BadRequestError('No se puede aceptar la renovación de un alquiler que no haya solicitado previamente dicha renovación'));
	}
	return req.entity.Locker.update({ lockerStateId: LockerStates.RESERVED })
		.then(() => req.entity.update({ rentalStateId: RentalStates.REQUESTED }))
		.then((rental) => rental.reload())
		.then((rental) => res.json(rental));
};

exports.denyRenewal = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.RENEWAL_REQUESTED) {
		return next(new BadRequestError('No puedes rechazar la renovación de un alquiler que no haya solicitado previamente dicha renovación'));
	}
	return req.entity.update({ rentalStateId: RentalStates.CLAIMED })
		.then((rental) => rental.reload())
		.then((rental) => res.json(rental));
};

exports.endRental = (req, res, next) => {
	if (req.entity.rentalStateId !== RentalStates.CLAIMED) {
		return next(new BadRequestError('No se puede terminar un alquiler del cuál no se haya informado su finalización previamente'));
	}
	if (parseInt(req.body.returnDespoit, 10) === 1) {
		const depositPayment = models.Payment.build(
			{
				quantity: req.entity.deposit * (-1),
				userId: req.entity.User.id,
				rentalId: req.entity.id,
				paymentMethodId: req.body.paymentMethodId,
			},
		);
		return depositPayment.save()
			.then(() => req.entity.Locker.update({ lockerStateId: req.body.lockerStateId }))
			.then(() => req.entity.update({
				rentalStateId: RentalStates.RETURNED,
				deposit: 0,
			}))
			.then((rental) => rental.reload())
			.then((rental) => res.json(rental));
	}

	return req.entity.Locker.update({ lockerStateId: req.body.lockerStateId })
		.then(() => req.entity.update({
			rentalStateId: RentalStates.RETURNED,
		}))
		.then((rental) => rental.reload())
		.then((rental) => res.json(rental));
};

exports.returnDeposit = (req, res, next) => {
	if (req.entity.deposit < parseFloat(req.body.quantity)) {
		return next(new BadRequestError('No se puede devolver más fianza de la restante'));
	}
	const depositPayment = models.Payment.build(
		{
			quantity: parseFloat(req.body.quantity) * (-1),
			userId: req.entity.User.id,
			rentalId: req.entity.id,
			paymentMethodId: req.body.paymentMethodId,
		},
	);
	return depositPayment.save()
		.then((payment) => req.entity.update({ deposit: req.entity.deposit - payment.quantity }))
		.then((rental) => res.json(rental));
};

exports.addDeposit = (req, res) => {
	const depositPayment = models.Payment.build(
		{
			quantity: parseFloat(req.body.quantity),
			userId: req.entity.User.id,
			rentalId: req.entity.id,
			paymentMethodId: req.body.paymentMethodId,
		},
	);
	return depositPayment.save()
		.then((payment) => req.entity.update({ deposit: req.entity.deposit + payment.quantity }))
		.then((rental) => res.json(rental));
};

exports.consumeDeposit = (req, res, next) => {
	if (req.entity.deposit === 0) {
		return next(new BadRequestError('No se puede consumir una fianza igual a 0'));
	}
	return req.entity.update({ deposit: 0 })
		.then((rental) => res.json(rental));
};
