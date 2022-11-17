const models = require('../../models/index');
const getCustomerByEmail = require('./getCustomerByEmail');
const { standardResponse } = require('../utils/helpers');
const { applyGeneralFilters } = require('../utils/sequelize');

const read = async (req) => {
    try {
        const {
            page, sortField, sortOrder, email,
        } = req.query;

        const { where, pagination, order } = applyGeneralFilters(req.query);

        if (email) {
            const response = await getCustomerByEmail(email);
            return response;
        }

        const result = await models.customer.findAndCountAll({
            attributes: { exclude: ['deleted_at', 'is_active'] },
            limit: pagination.limit,
            offset: pagination.offset,
            where,
            order,
            include: [
                {
                    model: models.customer_address,
                    attributes: { exclude: ['deleted_at', 'is_active'] },
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
            'Clientes encontrados',
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
