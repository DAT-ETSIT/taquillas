const express = require('express');
const lockerController = require('../controllers/locker');
const lockerStateController = require('../controllers/lockerState');

const router = express.Router();

// Autoload for routes using :param
router.param('lockerId', lockerController.load);
router.param('lockerStateId', lockerStateController.load);

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

module.exports = router;
