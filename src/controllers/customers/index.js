const customers = require('../../services/customers');

const createUser = async (req, res) => {
    const response = await customers.create(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    createUser,
};
