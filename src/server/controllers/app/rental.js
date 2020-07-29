const models = require('../../models');
const { LockerStates, RentalStates, MAX_RENTALS } = require('../../constants');
const { NotFoundError, BadRequestError, LimitedUserError } = require('../../errors');

exports.load = (req, res, next, rentalId) => {
	const options = {
		include: [
			models.User,
			models.Locker,
		],
	};
	models.Rental.findByPk(rentalId, options)
		.then((rental) => {
			if (rental) {
				req.rental = rental;
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
			next();
		});
};
