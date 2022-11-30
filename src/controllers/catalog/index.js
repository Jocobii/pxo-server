const initCatalog = require('../../services/catalog/initCatalog');

const getInitCatalogs = async (req, res) => {
    const response = await initCatalog(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    getInitCatalogs,
};
