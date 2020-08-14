const express = require('express');
const session = require('../controllers/session');
const defaultController = require('../controllers/defaultController');
const paymentMethod = require('../controllers/paymentMethod');

const router = express.Router();
// Admin Routes
router.use(session.loginRequired, session.adminRequired);

router.param('paymentMethodId', paymentMethod.load);

router.route('/')
	.get(paymentMethod.setDefaults, defaultController.index)
	.post(paymentMethod.create, defaultController.create);

router.route('/:paymentMethodId(\\d+)')
	.get(defaultController.show)
	.put(paymentMethod.update, defaultController.update)
	.delete(defaultController.destroy);

module.exports = router;
