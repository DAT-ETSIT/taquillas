const express = require('express');
const defaultController = require('../controllers/defaultController');
const location = require('../controllers/admin/location');
const locker = require('../controllers/admin/locker');
const paymentMethod = require('../controllers/admin/paymentMethod');

const router = express.Router();

// Autoload for routes using :param
router.param(
	'locationId',
	defaultController.load(location.model, location.loadOptions),
);

// Routes for the model Location
router.get(
	'/locations',
	location.setDefaults, defaultController.index,
);
router.get(
	'/location/:locationId(\\d+)',
	defaultController.show,
);
router.post(
	'/location',
	location.create, defaultController.create,
);
router.put(
	'/location/:locationId(\\d+)',
	location.update, defaultController.update,
);
router.delete(
	'/location/:locationId(\\d+)',
	location.setDefaults, defaultController.destroy,
);

// Autoload for routes using :param
router.param(
	'lockerId',
	defaultController.load(locker.model, locker.loadOptions),
);
// Routes for the model locker
router.get(
	'/lockers',
	locker.index, defaultController.index,
);
router.get(
	'/locker/:lockerId(\\d+)',
	defaultController.show,
);
router.post(
	'/locker',
	locker.create, defaultController.create,
);
router.put(
	'/locker/:lockerId(\\d+)',
	locker.update, defaultController.update,
);
router.delete(
	'/locker/:lockerId(\\d+)',
	defaultController.destroy,
);
// Autoload for routes using :param
router.param(
	'paymentMethodId',
	defaultController.load(paymentMethod.model, paymentMethod.loadOptions),
);
// Routes for the model paymentMethod
router.get(
	'/paymentMethods',
	paymentMethod.setDefaults, defaultController.index,
);
router.get(
	'/paymentMethod/:paymentMethodId(\\d+)',
	defaultController.show,
);
router.post(
	'/paymentMethod',
	paymentMethod.create, defaultController.create,
);
router.put(
	'/paymentMethod/:paymentMethodId(\\d+)',
	paymentMethod.update, defaultController.update,
);
router.delete(
	'/paymentMethod/:paymentMethodId(\\d+)',
	defaultController.destroy,
);

module.exports = router;
