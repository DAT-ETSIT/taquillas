const express = require('express');
const lockerController = require('../controllers/locker');
const lockerStateController = require('../controllers/lockerState');
const locationController = require('../controllers/location');
const userController = require('../controllers/user');
const paymentController = require('../controllers/payment');
const paymentMethodController = require('../controllers/paymentMethod');

const router = express.Router();

// Autoload for routes using :param
router.param('lockerId', lockerController.load);
router.param('lockerStateId', lockerStateController.load);
router.param('locationId', locationController.load);
router.param('userId', userController.load);
router.param('paymentId', paymentController.load);
router.param('paymentMethodId', paymentMethodController.load);

// Routes for the model locker
router.get('/lockers', lockerController.index);
router.get('/locker/:lockerId(\\d+)', lockerController.show);
router.post('/locker', lockerController.create);
router.put('/locker/:lockerId(\\d+)', lockerController.update);
router.delete('/locker/:lockerId(\\d+)', lockerController.destroy);

// Routes for the model lockerState
router.get('/lockerStates', lockerStateController.index);
router.get('/lockerState/:lockerStateId(\\d+)', lockerStateController.show);
router.post('/lockerState', lockerStateController.create);
router.put('/lockerState/:lockerStateId(\\d+)', lockerStateController.update);
router.delete('/lockerState/:lockerStateId(\\d+)', lockerStateController.destroy);

// Routes for the model location
router.get('/locations', locationController.index);
router.get('/location/:locationId(\\d+)', locationController.show);
router.post('/location', locationController.create);
router.put('/location/:locationId(\\d+)', locationController.update);
router.delete('/location/:locationId(\\d+)', locationController.destroy);

// Routes for the model user
router.get('/users', userController.index);
router.get('/user/:userId(\\d+)', userController.show);
router.post('/user', userController.create);
router.put('/user/:userId(\\d+)', userController.update);
router.delete('/user/:userId(\\d+)', userController.destroy);

// Routes for the model payment
router.get('/payments', paymentController.index);
router.get('/payment/:paymentId(\\d+)', paymentController.show);
router.post('/payment', paymentController.create);
router.put('/payment/:paymentId(\\d+)', paymentController.update);
router.delete('/payment/:paymentId(\\d+)', paymentController.destroy);

// Routes for the model paymentMethod
router.get('/paymentMethods', paymentMethodController.index);
router.get('/paymentMethod/:paymentMethodId(\\d+)', paymentMethodController.show);
router.post('/paymentMethod', paymentMethodController.create);
router.put('/paymentMethod/:paymentMethodId(\\d+)', paymentMethodController.update);
router.delete('/paymentMethod/:paymentMethodId(\\d+)', paymentMethodController.destroy);

module.exports = router;
