const express = require('express');
const session = require('../controllers/app/session');
const user = require('../controllers/app/user');
const location = require('../controllers/app/location');
const locker = require('../controllers/app/locker');
const rental = require('../controllers/app/rental');
const defaultController = require('../controllers/defaultController');

const router = express.Router();

// Session routes
router.get('/session', session.index);
router.get('/login', session.login);
router.get('/session/new', session.casLogin, session.create);
router.delete('/session', session.destroy);

// User routes
router.post('/user', user.create);

// The following routes require the user to be logged in.
router.use(session.loginRequired);

// Locations
router.param('locationId', location.load);
router.get('/locations', location.index, defaultController.index);

// Lockers
router.param('lockerId', locker.load);

// Action routes
router.param('rentalId', rental.load);
router.post(
	'/request/any/:locationId(\\d+)',
	rental.requestRandomLocker,
	session.updateUser,
	defaultController.sendResult,
);

router.post(
	'/request/locker/:lockerId(\\d+)',
	rental.requestLocker,
	session.updateUser,
	defaultController.sendResult,
);

router.post(
	'/request/renew/:rentalId(\\d+)',
	session.adminOrMyselfRequired,
	rental.requestRenew,
	session.updateUser,
	defaultController.sendResult,
);

module.exports = router;
