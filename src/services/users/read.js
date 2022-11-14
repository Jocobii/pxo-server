const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');
const { applyGeneralFilters } = require('../utils/sequelize');

const getAllUsers = async (req) => {
    try {
        const { page, sortField, sortOrder } = req.query;
        const { where, pagination, order } = applyGeneralFilters(req.query);

        const result = await models.User.findAndCountAll({
            limit: pagination.limit,
            offset: pagination.offset,
            attributes: [
                'id',
                'first_name',
                'middle_name',
                'first_last_name',
                'second_last_name',
                'email',
            ],
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
            'Usuarios encontrados',
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

module.exports = getAllUsers;
