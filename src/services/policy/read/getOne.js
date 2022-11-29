const models = require('../../../models/index');
const { standardResponse } = require('../../utils/helpers');
const { applyGeneralFilters } = require('../../utils/sequelize');

const queryForGetPolicy = async (where) => models.policy.findOne({
    attributes: { exclude: ['deleted_at', 'is_active'] },
    where,
    include: [
        {
            model: models.policy_detail,
            attributes: { exclude: ['deleted_at', 'is_active', 'customer_id', 'car_id'] },
            include: [
                {
                    model: models.customer,
                    attributes: { exclude: ['deleted_at', 'is_active'] },
                    include: [
                        { model: models.customer_address, attributes: { exclude: ['deleted_at', 'is_active', 'customer_id'] } },
                    ],
                },
                { model: models.car, attributes: { exclude: ['deleted_at', 'is_active'] } },
            ],
        },
    ],
});

const getOne = async (req) => {
    try {
        const { agency_id, id } = req.query;
        const { id: policyId } = req.body;
        const { where } = applyGeneralFilters(req.query);
        where.agency_id = agency_id;
        where.id = id ?? policyId;

        const result = await queryForGetPolicy(where);

        return standardResponse(
            false,
            200,
            'Poliza encontrada',
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

module.exports = {
    getOne,
    queryForGetPolicy,
};
