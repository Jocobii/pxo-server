const { Op } = require('sequelize');
const models = require('../../../models/index');
const { standardResponse } = require('../../utils/helpers');
const { applyGeneralFilters } = require('../../utils/sequelize');

const read = async (req) => {
    try {
        const {
            page, sortField, sortOrder, simple, agency_id,
            vin, email,
        } = req.query;

        const { where, pagination, order } = applyGeneralFilters(req.query);
        where.agency_id = agency_id;

        if (vin) {
            where['$policy_detail->car.vin$'] = {
                [Op.like]: `%${vin}%`,
            };
        }

        if (email) {
            where['$policy_detail->customer.email$'] = {
                [Op.like]: `%${email}%`,
            };
        }

        if (simple) {
            const result = await models.policy.findAndCountAll({
                attributes: ['id', 'number_extension', 'date_issue'],
                limit: pagination.limit,
                offset: pagination.offset,
                where,
                order,
                include: [
                    {
                        model: models.policy_detail,
                        attributes: ['id'],
                        include: [
                            {
                                model: models.customer,
                                attributes: ['fullName', 'name', 'first_last_name', 'second_last_name', 'rfc', 'email', 'cellPhone'],
                            },
                            {
                                model: models.car,
                                attributes: ['mileage', 'vin'],
                                include: [
                                    { model: models.category, attributes: ['name'] },
                                    { model: models.version, attributes: ['name'] },
                                ],
                            },
                        ],
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
                'Polizas encontradas',
                result.rows,
                info,
            );
        }

        const result = await models.policy.findAndCountAll({
            attributes: { exclude: ['deleted_at', 'is_active'] },
            limit: pagination.limit,
            offset: pagination.offset,
            where,
            order,
            include: [
                {
                    model: models.policy_detail,
                    attributes: { exclude: ['deleted_at', 'is_active', 'customer_id', 'car_id'] },
                    include: [
                        { model: models.customer, attributes: { exclude: ['deleted_at', 'is_active'] } },
                        {
                            model: models.car,
                            attributes: { exclude: ['deleted_at', 'is_active'] },
                            include: [
                                { model: models.category, attributes: ['name'] },
                                { model: models.version, attributes: ['name'] },
                            ],
                        },
                    ],
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
            'Polizas encontradas',
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
