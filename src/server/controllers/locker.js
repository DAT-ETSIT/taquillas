const Sequelize = require('sequelize');
const models = require('../models');

// Autoload the locker with id equals to :lockerId
exports.load = (req, res, next, lockerId) => {
	const options = {
		include: [
			models.Location,
			models.Status,
			{
				model: models.Loan,
				where: { isActive: 1 },
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
				throw new Error(`There is no locker with id = ${lockerId}`);
			}
		})
		.catch((error) => next(error));
};

