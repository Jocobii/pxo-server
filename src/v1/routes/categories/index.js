const express = require('express');

const router = express.Router();
const category = require('../../../controllers/categories');

router
    .get('/', category.getCategories);

module.exports = router;
