const express = require('express');
const session = require('../controllers/session');
const defaultController = require('../controllers/defaultController');
const rental = require('../controllers/rental');
const locker = require('../controllers/locker');
const location = require('../controllers/location');

const router = express.Router();
router.use(session.loginRequired);
// Params
router.param('rentalId', rental.load);
router.param('lockerId', locker.load);
router.param('locationId', location.load);

// Action routes
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
	'/:rentalId(\\d+)/request/renewal/',
	session.adminOrMyselfRequired,
	rental.requestRenewal,
	session.updateUser,
	defaultController.sendResult,
);

router.route('/')
	.get(rental.index, defaultController.index)

// Admin Routes
router.use(session.adminRequired);
// Routes for the model rental
router.route('/')
//	.get(rental.index, defaultController.index)
	.post(rental.create, defaultController.create);

router.route('/:rentalId(\\d+)')
	.get(defaultController.show)
	.put(rental.update, defaultController.update)
	.delete(defaultController.destroy);

// Routes for actions
router.post(
	'/:rentalId(\\d+)/start',
	rental.startRental,
);
router.post(
	'/:rentalId(\\d+)/claim',
	rental.claimRental,
);
router.post(
	'/:rentalId(\\d+)/renewal/accept',
	rental.acceptRenewal,
);
router.post(
	'/:rentalId(\\d+)/renewal/deny',
	rental.denyRenewal,
);
router.post(
	'/:rentalId(\\d+)/end',
	rental.endRental,
);
router.post(
	'/:rentalId(\\d+)/deposit/return',
	rental.returnDeposit,
);
router.post(
	'/:rentalId(\\d+)/deposit/add',
	rental.addDeposit,
);
router.post(
	'/:rentalId(\\d+)/deposit/consume',
	rental.consumeDeposit,
);

module.exports = router;
