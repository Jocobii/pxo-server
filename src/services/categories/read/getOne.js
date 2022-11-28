const models = require('../../../models/index');
const { standardResponse } = require('../../utils/helpers');
const { applyGeneralFilters } = require('../../utils/sequelize');

const getOneCategory = async (req) => {
    try {
        const { categoryId } = req.query;
        const { where } = applyGeneralFilters(req.query);

        where.id = categoryId;

        const result = await models.category.findOne({
            attributes: { exclude: ['deleted_at', 'is_active', 'brand_id', 'created_at', 'updated_at'] },
            where,
            include: [
                {
                    model: models.version,
                    attributes: { exclude: ['category_id', 'deleted_at', 'is_active', 'created_at', 'updated_at'] },
                },
            ],
        });

        return standardResponse(
            false,
            200,
            'Categoria encontrada',
            result,
        );
    } catch (error) {
        return standardResponse(
            true,
            500,
            'Ha ocurrido un error en el servdor',
        );
    }
};

module.exports = getOneCategory;
