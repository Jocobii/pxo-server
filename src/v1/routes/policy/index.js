const express = require('express');

const router = express.Router();
const policy = require('../../../controllers/policy');

router
    .post('/', policy.createPolicy)
    .put('/', policy.updatePolicy)
    .get('/', policy.getPolicies)
    .get('/validate', policy.validateByField)
    .get('/pdf/contract', policy.getContractPdf);
module.exports = router;
