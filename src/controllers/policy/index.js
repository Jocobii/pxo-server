const policy = require('../../services/policy');

const createPolicy = async (req, res) => {
    const response = await policy.create(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const getPolicies = async (req, res) => {
    const response = await policy.read(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const validateByField = async (req, res) => {
    const response = await policy.validate(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    createPolicy,
    getPolicies,
    validateByField,
};
