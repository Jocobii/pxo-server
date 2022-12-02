const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');

const excludeDefaultFields = ['deleted_at', 'is_active', 'brand_id'];

const deleteCatalog = async (req) => {
    const t = await models.sequelize.transaction();
    try {
        const { mainModel, id } = req.body;
        const where = { is_active: true };

        if (id) where.id = id;

        const result = await models[mainModel].findOne({
            attributes: { exclude: excludeDefaultFields },
            where,
        });

        if (!result) return standardResponse(true, 404, 'No se encontró el registro');

        await result.update({ is_active: false });

        await t.commit();
        return standardResponse(
            false,
            200,
            'Catalogo eliminado',
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

module.exports = deleteCatalog;
