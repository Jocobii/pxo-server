const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');
const { searchExactlyByField } = require('../../utils/sequelize');

const validateByField = async (req) => {
    try {
        const {
            fieldLike,
            searchLike,
        } = req.query;

        let where = { is_active: true };

        if (!fieldLike || !searchLike) {
            return standardResponse(
                true,
                400,
                'No se recibio como parametro fieldLike o searchLike',
            );
        }

        where = { ...searchExactlyByField(fieldLike, searchLike, where) };

        const policyExists = await models.policy.findOne({
            attributes: ['id'],
            where,
        });

        if (policyExists) {
            return standardResponse(
                true,
                422,
                'Ese numero de poliza ya existe',
                { exists: true },
            );
        }

        return standardResponse(
            false,
            200,
            'Numero de poliza valido',
            { exists: false },
        );
    } catch (error) {
        return standardResponse(true, 500, error.message);
    }
};

module.exports = validateByField;
