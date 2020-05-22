const env = process.env.NODE_ENV || 'development';
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./models');
const router = require('./router');
const adminRouter = require('./routers/admin');
const appRouter = require('./routers/app');
const config = require('./config/server.json')[env];
const { globalErrorHandler, NotFoundError } = require('./errors');

const app = express();

// Produce logs via morgan's middleware.
app.use(morgan('common'));
// Middleware for reading form-encoded POST payloads.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve the frontend files.
app.use(express.static('dist'));
// Let Express know if we are using a reverse proxy.
if (config.usingProxy) app.set('trust proxy', 1);
// Persistent session storage.
const sessionStore = new SequelizeStore({
	db: sequelize,
	table: 'Session',
	// The interval at which to cleanup expired sessions in milliseconds. (15 minutes)
	checkExpirationInterval: 15 * 60 * 1000,
	expiration: 4 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session. (4 hours)
});
app.use(session({
	secret: config.sessionSecret,
	store: sessionStore,
	resave: false,
	proxy: config.usingProxy,
	saveUninitialized: false,
	cookie: {
		// Make the cookies HTTPS-only if this is a production deployment.
		secure: env === 'production',
		// The cookie shouldn't be valid after 20 minutes of inactivity.
		maxAge: 20 * 60 * 1000, // milliseconds
	},
}));
// Main API router.
app.use('/api/v1/app', appRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1', router);
app.use('/api/v1/*', () => {
	throw new NotFoundError();
});

// Any other route.
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')));
// The error handler that produces 404/500 HTTP responses.
app.use(globalErrorHandler);

app.listen(config.port, function () { // eslint-disable-line func-names
	console.log('TAQUILLAS - Running on', this.address().address,
		'port', this.address().port);
});
