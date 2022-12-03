const express = require('express');

const router = express.Router();
const catalog = require('../../../controllers/catalog');

router
    .get('/init-catalogs', catalog.getInitCatalogs)
    .put('/', catalog.updateAnyCatalog)
    .post('/', catalog.createAnyCatalog)
    .delete('/', catalog.deleteCatalog)
    .get('/', catalog.getAnyCatalog);

module.exports = router;
