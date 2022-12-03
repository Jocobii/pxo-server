const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');

const excludeDefaultFields = ['deleted_at', 'is_active', 'brand_id'];

const convertIdValuesInNumber = (data) => {
    const object = plainObject(data);
    Object.entries(plainObject(object)).forEach(([key, value]) => {
        if (key.includes('_id')) {
            object[key] = Number(value);
        }
    });
    return object;
};

const update = async (req) => {
    const t = await models.sequelize.transaction();
    try {
        const { mainModel, id } = req.body;
        const where = { is_active: true };

        if (id) where.id = id;

        const includesModels = [];
        Object.entries(req.body).forEach(([key]) => {
            if (key.includes('_id')) {
                includesModels.push(key.split('_id')[0]);
            }
        });

        const exists = await models[mainModel].findOne({
            attributes: { exclude: excludeDefaultFields },
            where,
        });
        if (!exists) return standardResponse(true, 404, 'No se encontró el registro');

        await models[mainModel].update(req.body, { where });

        const result = await models[mainModel].findOne({
            attributes: { exclude: excludeDefaultFields },
            where,
            include: includesModels.map((model) => ({
                model: models[model],
                attributes: { exclude: excludeDefaultFields },
            })),
        });
        const data = convertIdValuesInNumber(result);
        await t.commit();
        return standardResponse(
            false,
            200,
            'Catalogo actualizado',
            data,
        );
    } catch (error) {
        console.log(error);
        await t.rollback();
        return standardResponse(
            true,
            500,
            'Ha ocurrido un error en el servdor',
        );
    }
};

module.exports = update;
