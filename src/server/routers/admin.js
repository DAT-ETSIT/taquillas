const express = require('express');
const defaultController = require('../controllers/defaultController');
const location = require('../controllers/admin/location');
const user = require('../controllers/admin/user');

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

// Routes for the model user
router.get(
	'/users',
	user.index, defaultController.index,
);
router.get(
	'/user/:userId(\\d+)',
	defaultController.show,
);
router.post(
	'/user',
	user.create, defaultController.create,
);
router.put(
	'/user/:userId(\\d+)',
	user.update, defaultController.update,
);
router.delete(
	'/user/:userId(\\d+)',
	defaultController.destroy,
);

module.exports = router;
