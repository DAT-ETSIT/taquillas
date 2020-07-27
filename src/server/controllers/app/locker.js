const models = require('../../models');
const { NotFoundError } = require('../../errors');

exports.load = (req, res, next, lockerId) => {
	models.Locker.findByPk(lockerId)
		.then((locker) => {
			if (locker) {
				req.locker = locker;
				next();
			} else {
				throw new NotFoundError();
			}
		})
		.catch((error) => next(error));
};
