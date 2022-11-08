const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');
const { getLimitAndOffset, getOrderBySort } = require('../utils/sequelize');

const getAllUsers = async (req) => {
    const {
        results, page, sortField, sortOrder,
    } = req.query;

    const { limit, offset } = getLimitAndOffset(results, page);
    const order = getOrderBySort(models, sortField, sortOrder);

    const result = await models.User.findAndCountAll({
        limit,
        offset,
        attributes: ['id', 'first_name', 'middle_name', 'first_last_name', 'second_last_name', 'email'],
        where: { isActive: true },
        order,
    });

    const info = {
        total: result.count,
        results: limit,
        page: page ? parseInt(page, 10) : 1,
        sortField,
        sortOrder,
    };

    return standardResponse(false, 200, 'Usuarios encontrados', result.rows, info);
};

module.exports = getAllUsers;
