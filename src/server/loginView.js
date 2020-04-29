/** View that handles CAS's response after login.
 *
 * This is NOT an API endpoint, it simply redirects the user depending on
 * whether the authentication was successful or not.
 *
 * If a valid token is provided, the user is redirected to the URL specified in
 * the "redirect" query parameter. In the rare case that the token was invalid,
 * the user is redirected to /failed-login.
 *
 * Keep in mind that CAS is supposed to take the user here iff the
 * authentication was successful, so the user should never get to /failed-login
 * (or at least in theory).
 */
const env = process.env.NODE_ENV || 'development';
const got = require('got');
const xml2js = require('xml2js');
const xmlProcessors = require('xml2js/lib/processors');
const config = require('./config/server.json')[env];

module.exports.requestHandler = (req, res, next) => {
	// CAS emits each token for a specific service, identified by its strict URL
	// (including path, the querystring, etc.).
	// We are therefore forced to include the same information when validating
	// the token for our service.
	const serviceUrl = new URL(req.originalUrl, config.url);
	serviceUrl.searchParams.delete('ticket');

	const validationUrl = `${config.cas.ssoUrl}/p3/serviceValidate?`
		+ `service=${encodeURIComponent(serviceUrl.href)}&`
		+ `ticket=${encodeURIComponent(req.query.ticket)}`;

	return got(validationUrl)
		.then((response) => {
			const parserOptions = {
				// Remove the XML namespace prefixes to access the parsed
				// object more easily.
				tagNameProcessors: [xmlProcessors.stripPrefix],
			};
			xml2js.parseString(response.body, parserOptions, (err, result) => {
				if (err) throw err;

				// Go to /failed-login if the token isn't valid.
				const { serviceResponse } = result;
				// TODO: Make /failed-login display the user a view indicating
				// that there was an authentication issue. This can be done
				// with react-router, for instance.
				if (serviceResponse.authenticationFailure) return res.redirect('/failed-login');

				serviceResponse.authenticationSuccess.forEach((obj) => {
					// Find the user and add it to req.session.
					if ('user' in obj) {
						[req.session.user] = obj.user;
					}
					// Find the relevant attributes and store them in
					// req.session as well.
					if ('attributes' in obj) {
						const [attributes] = obj.attributes;
						[req.session.org] = attributes.o;
						[req.session.name] = attributes.cn;
						[req.session.surname] = attributes.sn;
					}
				});

				// Take the user back to wherever they were before the login.
				return res.redirect(req.query.redirect);
			});
		})
		.catch(e => next(e));
};
