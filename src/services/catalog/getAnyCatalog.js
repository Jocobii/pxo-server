const models = require('../../models');
const { standardResponse } = require('../utils/helpers');
const { applyGeneralFilters } = require('../utils/sequelize');

const excludeDefaultFields = ['deleted_at', 'is_active', 'brand_id'];

const getAnyCatalog = async (req) => {
    try {
        const {
            page, sortField, sortOrder,
        } = req.query;
        const { where, pagination, order } = applyGeneralFilters(req.query);
        const { mainModel, include = '' } = req.query;
        const includeFirstLevel = include !== '' ? include?.split(',') : [];

        const result = await models[mainModel].findAndCountAll({
            limit: pagination.limit,
            attributes: { exclude: excludeDefaultFields },
            offset: pagination.offset,
            where,
            order,
            include: includeFirstLevel.length > 0 ? includeFirstLevel.map((model) => (
                { model: models[model], attributes: { exclude: excludeDefaultFields } }
            )) : null,
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
            'Catalogo encontrado',
            result.rows,
            info,
        );
    } catch (error) {
        console.log(error);
        return standardResponse(
            true,
            500,
            'Ha ocurrido un error en el servdor',
        );
    }
};

module.exports = getAnyCatalog;
