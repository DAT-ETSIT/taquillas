const express = require('express');
const defaultController = require('../controllers/defaultController');
const location = require('../controllers/admin/location');
const middlewares = require('../middlewares');

const router = express.Router();

// All endpoints require authentication.
router.use(middlewares.checkLogin);

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

module.exports = router;
