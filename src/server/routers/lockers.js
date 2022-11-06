const express = require('express');
const session = require('../controllers/session');
const defaultController = require('../controllers/defaultController');
const locker = require('../controllers/locker');

const router = express.Router();
router.use(session.loginRequired);
// Lockers
router.param('lockerId', locker.load);

router.route('/')
	.get(locker.index, defaultController.index)

// Admin Routes
router.use(session.adminRequired);
router.route('/')
//	.get(locker.index, defaultController.index)
	.post(locker.create, defaultController.create);

router.route('/:lockerId(\\d+)')
	.get(defaultController.show)
	.put(locker.update, defaultController.update)
	.delete(defaultController.destroy);

module.exports = router;
