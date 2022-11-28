const express = require('express');

const router = express.Router();
const warranty = require('../../../controllers/warranty');

router
    .get('/', warranty.getWarranties);

module.exports = router;
