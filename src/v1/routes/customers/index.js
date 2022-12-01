const express = require('express');

const router = express.Router();
const customer = require('../../../controllers/customers');
const { customerCreateSchema } = require('./middleware/customers.schema');

router
    .post('/', customerCreateSchema, customer.createCustomer)
    .get('/', customer.getCustomers)
    .put('/', customer.updateCustomer);
module.exports = router;
