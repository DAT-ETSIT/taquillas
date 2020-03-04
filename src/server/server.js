const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
const adminRouter = require('./routers/admin');
const appRouter = require('./routers/app');
const config = require('./config.json');
const { globalErrorHandler } = require('./errors');

const app = express();

// Produce logs via morgan's middleware.
app.use(morgan('common'));
// Middleware for reading form-encoded POST payloads.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve the frontend files.
app.use(express.static('dist'));
// Let Express know if we are using a reverse proxy.
if (config.server.usingProxy) app.set('trust proxy', 1);
// Main API router.
app.use('/api/v1/app', appRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1', router);
// Any other route.
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')));
// The error handler that produces 404/500 HTTP responses.
app.use(globalErrorHandler);

app.listen(config.server.port, function () { // eslint-disable-line func-names
	console.log('TAQUILLAS - Running on', this.address().address,
		'port', this.address().port);
});
