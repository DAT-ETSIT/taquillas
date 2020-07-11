const express = require('express');
const session = require('../controllers/app/session');
const user = require('../controllers/app/user');

const router = express.Router();

// Session routes
router.get('/session', session.index);
router.get('/login', session.login);
router.get('/session/new', session.casLogin, session.create);
router.delete('/session', session.destroy);

// User routes
router.post('/user', user.create);

module.exports = router;
