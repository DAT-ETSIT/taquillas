const express = require('express');
const session = require('../controllers/session');

const router = express.Router();

// Session routes
router.route('/')
	.get(session.index)
	.delete(session.destroy);

router.get('/login', session.login);
router.get('/new', session.casLogin, session.create);

module.exports = router;
