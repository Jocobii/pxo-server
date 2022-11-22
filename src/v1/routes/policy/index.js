const express = require('express');

const router = express.Router();
const policy = require('../../../controllers/policy');

router
    .post('/', policy.createPolicy)
    .get('/', policy.getPolicies)
    .get('/validate', policy.validateByField);

module.exports = router;
