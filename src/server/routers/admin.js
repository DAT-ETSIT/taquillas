const express = require('express');
const defaultController = require('../controllers/defaultController');
const payment = require('../controllers/admin/payment');
const paymentMethod = require('../controllers/admin/paymentMethod');
const session = require('../controllers/app/session');

const router = express.Router();

// All users require a logged user with administrator permissions.
router.use(session.loginRequired, session.adminRequired);

// Autoload for routes using :param
router.param(
	'paymentMethodId',
	defaultController.load(paymentMethod.model, paymentMethod.loadOptions),
);
// Routes for the model paymentMethod
router.get(
	'/paymentMethods',
	paymentMethod.setDefaults, defaultController.index,
);
router.get(
	'/paymentMethod/:paymentMethodId(\\d+)',
	defaultController.show,
);
router.post(
	'/paymentMethod',
	paymentMethod.create, defaultController.create,
);
router.put(
	'/paymentMethod/:paymentMethodId(\\d+)',
	paymentMethod.update, defaultController.update,
);
router.delete(
	'/paymentMethod/:paymentMethodId(\\d+)',
	defaultController.destroy,
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
