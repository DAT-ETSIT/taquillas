const { NotFoundError } = require('../errors');

exports.load = (model, options) => function load(req, res, next, entityId) {
	model.findByPk(entityId, options)
		.then((entity) => {
			if (entity) {
				req.entity = entity;
				next();
			} else {
				throw new NotFoundError();
			}
		})
		.catch((error) => next(error));
};
