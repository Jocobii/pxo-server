const express = require('express');

const router = express.Router();
const validation = require('../../../controllers/validations');

router
    .get('/', validation.validateIfExistsByField);

module.exports = router;
