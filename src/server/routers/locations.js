const express = require('express');
const session = require('../controllers/session');
const defaultController = require('../controllers/defaultController');
const location = require('../controllers/location');

const router = express.Router();
router.use(session.loginRequired);

router.param('locationId', location.load);

router.get('/available', location.available, defaultController.index);

// Admin Routes
router.use(session.adminRequired);

router.route('/')
	.get(location.setDefaults, defaultController.index)
	.post(location.create, defaultController.create);

router.route('/:locationId(\\d+)')
	.get(defaultController.show)
	.put(location.update, defaultController.update)
	.delete(location.setDefaults, defaultController.destroy);

module.exports = router;
