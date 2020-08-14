const express = require('express');
const session = require('../controllers/app/session');
const user = require('../controllers/user');
const location = require('../controllers/location');
const locker = require('../controllers/locker');
const rental = require('../controllers/app/rental');
const defaultController = require('../controllers/defaultController');

const router = express.Router();

// Session routes
router.get('/session', session.index);
router.get('/login', session.login);
router.get('/session/new', session.casLogin, session.create);
router.delete('/session', session.destroy);

// Create user endpoint
router.post('/user', user.signUp);

// The following routes require the user to be logged in.
router.use(session.loginRequired);

// User routes
router.param('userId', user.load);
router.post(
	'/user/:userId(\\d+)',
	session.adminOrMyselfRequired,
	user.editProfile,
	session.updateUser,
	defaultController.sendResult,
);

// Locations
router.param('locationId', location.load);
router.get('/locations/available', location.available, defaultController.index);

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
	'/request/renewal/:rentalId(\\d+)',
	session.adminOrMyselfRequired,
	rental.requestRenewal,
	session.updateUser,
	defaultController.sendResult,
);


module.exports = router;
