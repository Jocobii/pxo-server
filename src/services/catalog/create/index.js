const dayjs = require('dayjs');
const models = require('../../../models');
const { plainObject } = require('../../../utils/helpers');
const { standardResponse } = require('../../utils/helpers');

const excludeDefaultFields = ['deleted_at', 'is_active', 'brand_id'];
const HONDA = 1;

const validate = async (req) => {
    const {
        mainModel, name,
    } = req.body;
    const where = { is_active: true };

    if (name) where.name = name.trim();

    const result = await models[mainModel].findOne({
        attributes: { exclude: excludeDefaultFields },
        where,
    });

    if (result) return standardResponse(true, 422, 'Ya existe un registro');
    return false;
};
const create = async (req) => {
    const t = await models.sequelize.transaction();
    try {
        const {
            mainModel, ignoreValidations,
        } = req.body;

        if (!ignoreValidations) {
            const validation = await validate(req);
            if (validation) return validation;
        }

        const catalogCreated = await models[mainModel].create(
            {
                ...req.body, brand_id: HONDA,
            },
            { transaction: t },
        );
        const catalogCreatedPlain = plainObject(catalogCreated);
        catalogCreatedPlain.created_at = dayjs().format('YYYY/MM/DD');
        await t.commit();
        return standardResponse(
            false,
            200,
            'Catalogo actualizado',
            catalogCreatedPlain,
        );
    } catch (error) {
        await t.rollback();
        return standardResponse(
            true,
            500,
            'Ha ocurrido un error en el servdor',
        );
    }
};

module.exports = create;
