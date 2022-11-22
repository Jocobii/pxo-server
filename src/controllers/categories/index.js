const category = require('../../services/categories');

const getCategories = async (req, res) => {
    const response = await category.read(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    getCategories,
};
