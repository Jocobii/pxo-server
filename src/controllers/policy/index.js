const policy = require('../../services/policy');

const createPolicy = async (req, res) => {
    const response = await policy.create(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const getPolicy = async (req, res) => {
    const response = await policy.read(req);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

module.exports = {
    createPolicy,
    getPolicy,
};
