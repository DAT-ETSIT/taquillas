const express = require('express');
const session = require('../controllers/session');
const defaultController = require('../controllers/defaultController');
const payment = require('../controllers/payment');

const router = express.Router();
// Admin Routes
router.use(session.loginRequired, session.adminRequired);

router.param('paymentId', payment.load);

router.route('/')
	.get(payment.index, defaultController.index)
	.post(payment.create, defaultController.create);

router.route('/:paymentId(\\d+)')
	.get(defaultController.show)
	.put(payment.update, defaultController.update)
	.delete(defaultController.destroy);

module.exports = router;
