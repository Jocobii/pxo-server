const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');
const { applyGeneralFilters } = require('../utils/sequelize');

const read = async (req) => {
    try {
        const {
            page, sortField, sortOrder,
        } = req.query;

        const { where, pagination, order } = applyGeneralFilters(req.query);

        const result = await models.warranty.findAndCountAll({
            attributes: { exclude: ['deleted_at', 'is_active'] },
            limit: pagination.limit,
            offset: pagination.offset,
            where,
            order,
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
            'Productoos encontrados',
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

module.exports = read;
