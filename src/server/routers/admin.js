const express = require('express');
const defaultController = require('../controllers/defaultController');
const location = require('../controllers/admin/location');
const rental = require('../controllers/admin/rental');

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
	'rentalId',
	defaultController.load(rental.model, rental.loadOptions),
);

// Routes for the model rental
router.get(
	'/rentals',
	rental.index, defaultController.index,
);
router.get(
	'/rental/:rentalId(\\d+)',
	defaultController.show,
);

router.post(
	'/rental',
	rental.create, defaultController.create,
);
router.put(
	'/rental/:rentalId(\\d+)',
	rental.update, defaultController.update,
);
router.delete(
	'/rental/:rentalId(\\d+)',
	defaultController.destroy,
);
module.exports = router;
