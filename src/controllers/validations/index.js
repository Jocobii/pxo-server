const validateByField = require('../../services/validations');

const validateIfExistsByField = async (req, res) => {
    const result = await validateByField(req);
    res.status(result.httpCode).json(result);
};
module.exports = {
    validateIfExistsByField,
};
