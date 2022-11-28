const category = require('../../services/categories/read');

const getCategories = async (req, res) => {
    const { categoryId } = req.query;
    const response = categoryId
        ? await category.getOneCategory(req) : await category.getAllCategories(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    getCategories,
};
