const express = require('express');
const defaultController = require('../controllers/defaultController');
const payment = require('../controllers/admin/payment');
const session = require('../controllers/app/session');

const router = express.Router();

// All users require a logged user with administrator permissions.
router.use(session.loginRequired, session.adminRequired);

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
