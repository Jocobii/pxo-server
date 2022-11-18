const express = require('express');

const router = express.Router();
const policy = require('../../../controllers/policy');

router
    .post('/', policy.createPolicy);

module.exports = router;
