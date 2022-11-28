const getWarrantiesService = require('../../services/warranty');

const getWarranties = async (req, res) => {
    const result = await getWarrantiesService(req);
    res.status(result.httpCode).json(result);
};
module.exports = {
    getWarranties,
};
