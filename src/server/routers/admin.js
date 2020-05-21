const express = require('express');
const defaultController = require('../controllers/defaultController');
const location = require('../controllers/admin/location');
const payment = require('../controllers/admin/payment');

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
	'paymentId',
	defaultController.load(payment.model, payment.loadOptions),
);

// Routes for the model payment
router.get(
	'/payments',
	payment.index, defaultController.index,
);
router.get(
	'/payment/:paymentId(\\d+)',
	defaultController.show,
);
router.post(
	'/payment',
	payment.create, defaultController.create,
);
router.put(
	'/payment/:paymentId(\\d+)',
	payment.update, defaultController.update,
);
router.delete(
	'/payment/:paymentId(\\d+)',
	defaultController.destroy,
);

module.exports = router;
