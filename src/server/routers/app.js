const express = require('express');
const session = require('../controllers/app/session');

const router = express.Router();

// Session routes
router.get('/session', session.index);
router.get('/login', session.login);
router.get('/session/new', session.casLogin, session.create);
router.delete('/session', session.destroy);

module.exports = router;
