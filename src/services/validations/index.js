const { standardResponse } = require('../utils/helpers');
const { validateIfExistsByField } = require('../utils/sequelize');

const validateByField = async (req) => {
    try {
        const {
            fieldLike,
            searchLike,
            modelName,
            id,
        } = req.query;

        if (!fieldLike || !searchLike) {
            return standardResponse(
                true,
                400,
                'No se recibio como parametro modelName, fieldLike o searchLike',
            );
        }

        const result = await validateIfExistsByField(modelName, fieldLike, searchLike, id);

        return standardResponse(
            !!result,
            200,
            result ? 'Ya existe un registro' : 'No se encontro un registro',
            { exists: !!result },
        );
    } catch (error) {
        return standardResponse(true, 500, error.message);
    }
};

module.exports = validateByField;
