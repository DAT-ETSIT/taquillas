const Sequelize = require('sequelize');
const models = require('../models');

// Autoload the locker with id equals to :lockerId
exports.load = (req, res, next, lockerId) => {
	const options = {
		include: [
			models.Location,
			models.LockerState,
			{
				model: models.Rental,
				include: [models.User],
			},
		],
	};

	models.Locker.findByPk(lockerId, options)
		.then((locker) => {
			if (locker) {
				req.locker = locker;
				next();
			} else {
				res.status(404).json({ status: 'ERROR', errors: `Locker not found with id: ${lockerId}` });
			}
		})
		.catch((error) => next(error));
};
