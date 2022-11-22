const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');
const { applyGeneralFilters } = require('../utils/sequelize');

const getAllUsers = async (req) => {
    try {
        const {
            page, sortField, sortOrder,
        } = req.query;
        const { where, pagination, order } = applyGeneralFilters(req.query);

        const result = await models.category.findAndCountAll({
            limit: pagination.limit,
            attributes: { exclude: ['deleted_at', 'is_active', 'brand_id', 'created_at', 'updated_at'] },
            offset: pagination.offset,
            where,
            order,
            include: [
                {
                    model: models.version,
                    attributes: { exclude: ['category_id', 'deleted_at', 'is_active', 'created_at', 'updated_at'] },
                },
            ],
        });

        const info = {
            total: result.count,
            results: pagination.limit,
            page: page ? parseInt(page, 10) : 1,
            sortField,
            sortOrder,
        };

        return standardResponse(
            false,
            200,
            'Categorias encontradas',
            result.rows,
            info,
        );
    } catch (error) {
        return standardResponse(
            true,
            500,
            'Ha ocurrido un error en el servdor',
        );
    }
};

module.exports = getAllUsers;
