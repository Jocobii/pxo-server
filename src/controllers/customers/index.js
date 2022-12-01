const customers = require('../../services/customers');

const createCustomer = async (req, res) => {
    const response = await customers.create(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const getCustomers = async (req, res) => {
    const { id } = req.query;
    const response = id ? await customers.getOne(req) : await customers.getAll(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const updateCustomer = async (req, res) => {
    const response = await customers.update(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    createCustomer,
    getCustomers,
    updateCustomer,
};
