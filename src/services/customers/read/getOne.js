const models = require('../../../models');
const { applyGeneralFilters } = require('../../utils/sequelize');
const { standardResponse } = require('../../utils/helpers');

const read = async (req) => {
    try {
        const { simple, id } = req.query;
        const { where, pagination, order } = applyGeneralFilters(req.query);

        if (Number(id)) where.id = id;

        if (simple) {
            const result = await models.customer.findOne({
                attributes: ['id', 'name', 'middle_name', 'first_last_name', 'second_last_name', 'fullName', 'email', 'is_company', 'cellPhone', 'rfc'],
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
            return standardResponse(
                false,
                200,
                'Cliente encontrado',
                result,
            );
        }

        const result = await models.customer.findOne({
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

        return standardResponse(
            false,
            200,
            'Cliente encontrado',
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

module.exports = read;
