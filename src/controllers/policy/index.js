const policy = require('../../services/policy');

const createPolicy = async (req, res) => {
    const response = await policy.create(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const updatePolicy = async (req, res) => {
    const response = await policy.update(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const getPolicies = async (req, res) => {
    const { id } = req.query;

    const response = id ? await policy.getOne(req) : await policy.getAll(req);

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

const getContractPdf = async (req, res) => {
    const response = await policy.createContract(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
    // res.send('pdf');
    // const response = await policy.createContractPDF(req);
    // if (response.error) {
    //     res.status(400).json(response);
    //     return;
    // }
    // res.json(response);
};

module.exports = {
    createPolicy,
    getPolicies,
    updatePolicy,
    validateByField,
    getContractPdf,
};
