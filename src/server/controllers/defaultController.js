const { BadRequestError } = require('../errors');

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

exports.update = (req, res, next) => {
	const { entity, body } = req;
	const fields = [];

	req.allowedFields.forEach((field) => {
		if (Object.prototype.hasOwnProperty.call(body, field)) {
			entity[field] = body[field];
			fields.push(field);
		}
	});
	// Check if there is at least one field to update
	if (!fields) {
		throw new BadRequestError();
	}

	entity.save({ fields })
		.then((newEntity) => {
			res.json(newEntity);
		})
		.catch((error) => next(error));
};

exports.destroy = (req, res, next) => {
	req.entity.destroy()
		.then(() => {
			res.json({ status: 'OK' });
		})
		.catch((error) => next(error));
};

exports.create = (req, res, next) => {
	req.entity.save()
		.then((entity) => {
			res.json(entity);
		})
		.catch((error) => {
			next(error);
		});
};

exports.sendResult = (req, res) => {
	res.json(req.result);
};
