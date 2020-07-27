const { ValidationError } = require('sequelize');

class BadRequestError extends Error {
	constructor(message = 'Bad request') {
		super(message);
		this.statusCode = 400;
		this.codeName = 'bad_request';
	}
}
module.exports.BadRequestError = BadRequestError;

class LimitedUserError extends Error {
	constructor(message = 'This user is not allowed to make such action') {
		super(message);
		this.statusCode = 403;
		this.codeName = 'limited_user';
	}
}
module.exports.LimitedUserError = LimitedUserError;

class NotFoundError extends Error {
	constructor(message = 'Page not found') {
		super(message);
		this.statusCode = 404;
		this.codeName = 'not_found';
	}
}
module.exports.NotFoundError = NotFoundError;

class UnauthorizedError extends Error {
	constructor(message = 'Login required') {
		super(message);
		this.statusCode = 401;
		this.codeName = 'unauthorized';
	}
}
module.exports.UnauthorizedError = UnauthorizedError;

// The global error handler.
// Express requires the 4 arguments to be present in order to identify this as
// an error handler.
// eslint-disable-next-line no-unused-vars
module.exports.globalErrorHandler = (err, req, res, next) => {
	if (err instanceof BadRequestError
		|| err instanceof LimitedUserError
		|| err instanceof NotFoundError
		|| err instanceof UnauthorizedError) {
		return res.status(err.statusCode).json({
			error: err.codeName,
			message: err.message,
		});
	}

	if (err instanceof ValidationError) {
		return res.status(400).json({
			error: 'bad_request',
			message: err.errors,
		});
	}

	// Some other unknown error.
	console.error(err);
	res.status(500).json({
		error: 'internal_server_error',
		message: 'Internal server error',
	});
	return next(err); // Let it pass the middleware so Sentry can catch it.
};
