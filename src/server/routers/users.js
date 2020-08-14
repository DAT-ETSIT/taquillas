const express = require('express');
const session = require('../controllers/session');
const defaultController = require('../controllers/defaultController');
const user = require('../controllers/user');

const router = express.Router();

router.post('/signup', user.signUp);

// The following routes require the user to be logged in.
router.use(session.loginRequired);

router.param('userId', user.load);

router.post(
	'/:userId(\\d+)/edit',
	session.adminOrMyselfRequired,
	user.editProfile,
	session.updateUser,
	defaultController.sendResult,
);

// Admin Routes
router.use(session.adminRequired);

router.route('/')
	.get(user.index, defaultController.index)
	.post(user.create, defaultController.create);

router.route('/:userId(\\d+)')
	.get(defaultController.show)
	.put(user.update, defaultController.update)
	.delete(defaultController.destroy);

module.exports = router;
