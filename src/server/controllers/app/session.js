const env = process.env.NODE_ENV || 'development';
const config = require('../../config/server.json')[env];
const models = require('../../models');


const login = (req, res) => {
	// Compose the backend URL that should handle the redirect after
	// a successful login (/login?redirect={window.location.href}).
	const callbackUrl = new URL(`${config.url}/api/v1/app/session/new`);
	req.query.redirect = req.query.redirect || '/';
	callbackUrl.searchParams.set('redirect', req.query.redirect);

	// Insert the callback URL as the service.
	const ssoRedirectUrl = new URL(config.cas.ssoUrl);
	ssoRedirectUrl.searchParams.set('service', callbackUrl.href);

	res.redirect(ssoRedirectUrl.href);
};

const loginMock = (req, res, next) => {
	const options = {
		raw: true,
		limit: 1,
		order: [['createdAt', 'ASC']],
	};
	models.User.findAll(options)
		.then((users) => {
			if (users[0]) {
				const [user] = users;
				req.session.user = user;
			}
			const mockCAS = {
				name: 'Wil',
				surname: 'Wheaton',
				email: 'admin@example.es',
				org: '09',
			};
			req.session.name = mockCAS.name;
			req.session.surname = mockCAS.surname;
			req.session.email = mockCAS.email;
			req.session.org = mockCAS.org;
			if (!users[0]) {
				return res.redirect('/signup');
			}
			return res.redirect(req.query.redirect);
		})
		.catch((error) => next(error));
};
// Load the mocked login check if this is a development instance.
exports.login = (
	(env === 'development') ? loginMock : login);

