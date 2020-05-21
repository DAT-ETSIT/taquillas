const express = require('express');
const defaultController = require('../controllers/defaultController');
const location = require('../controllers/admin/location');
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
