const { UnauthorizedError } = require('./errors');

function checkLogin(req, res, next) {
	if (!req.session.user) return next(new UnauthorizedError());
	return next();
}

function checkLoginMock(req, res, next) {
	console.log('[WARNING] Using the mocked login controller!');
	req.session.user = 'james.maxwell@alumnos.upm.es';
	req.session.org = '09';
	req.session.name = 'JAMES';
	req.session.surname = 'MAXWELL';
	return next();
}

// Load the mocked login check iff this is a development instance.
module.exports.checkLogin = (
	(process.env.NODE_ENV === 'development') ? checkLoginMock : checkLogin);
