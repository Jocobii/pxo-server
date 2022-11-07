const express = require('express');

const router = express.Router();

router.use('/api/v1/users', require('./user/user'));
router.use('/api/v1/auth', require('./auth/auth'));

module.exports = router;