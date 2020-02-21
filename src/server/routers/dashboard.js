const express = require('express');
const lockerController = require('../controllers/locker');

const router = express.Router();

// Autoload for routes using :param
router.param('lockerId', lockerController.load);

// Routes for the resource /lockers
router.get('/lockers', lockerController.index);
router.get('/locker/:lockerId(\\d+)', lockerController.show);
router.post('/locker', lockerController.create);
router.put('/locker/:lockerId(\\d+)', lockerController.update);
router.delete('/locker/:lockerId(\\d+)', lockerController.destroy);

module.exports = router;
