const catalog = require('../../services/catalog');

const getInitCatalogs = async (req, res) => {
    const response = await catalog.initCatalog(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const getAnyCatalog = async (req, res) => {
    const response = await catalog.getAnyCatalog(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const updateAnyCatalog = async (req, res) => {
    const response = await catalog.update(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const createAnyCatalog = async (req, res) => {
    const response = await catalog.create(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const deleteCatalog = async (req, res) => {
    const response = await catalog.deleteCatalog(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    getInitCatalogs,
    getAnyCatalog,
    createAnyCatalog,
    updateAnyCatalog,
    deleteCatalog,
};
