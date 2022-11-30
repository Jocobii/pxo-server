const express = require('express');

const router = express.Router();
const catalog = require('../../../controllers/catalog');

router
    .get('/init-catalogs', catalog.getInitCatalogs);

module.exports = router;
