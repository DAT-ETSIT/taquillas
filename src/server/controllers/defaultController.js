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

exports.index = (req, res, next) => {
	req.model.findAll(req.options)
		.then((entity) => {
			res.json(entity);
		})
		.catch((error) => next(error));
};

exports.show = (req, res) => {
	const { entity } = req;
	res.json(entity);
};
