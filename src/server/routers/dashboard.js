const express = require('express');
const lockerController = require('../controllers/locker');

const router = express.Router();

// Autoload for routes using :param
router.param('lockerId', lockerController.load);

module.exports = router;
