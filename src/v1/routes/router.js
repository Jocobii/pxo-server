const express = require('express');

const router = express.Router();

router.use('/api/v1/users', require('./user/user'));
router.use('/api/v1/auth', require('./auth/auth'));
router.use('/api/v1/customers', require('./customers'));
router.use('/api/v1/policies', require('./policy'));
router.use('/api/v1/car-categories', require('./categories'));
router.use('/api/v1/validateByField', require('./validations'));
router.use('/api/v1/products', require('./warranty'));

module.exports = router;
