const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');
const updateCar = require('./updateCar');
const updatePolicyWithDetails = require('./updatePolicy');
const { queryForGetPolicy } = require('../read/getOne');

const updatePolicy = async (req) => {
    const t = await models.sequelize.transaction();
    try {
        const {
            id, customer, car, agency_id,
        } = req.body;
        const policyExists = await models.policy.findOne({
            attributes: ['id'],
            where: {
                id,
                is_active: true,
            },
        });

        if (!policyExists) {
            return standardResponse(
                true,
                404,
                'Esa poliza no existe en la base de datos',
            );
        }

        const isCompany = customer.is_company === 'true';
        await models.customer.update(
            {
                ...customer,
                is_company: isCompany,
                middle_name: customer.middle_name || null,
                first_last_name: customer.first_last_name || null,
                second_last_name: customer.second_last_name || null,
                date_incorporation_company: isCompany ? customer.date_incorporation_company : null,
            },
            {
                where: { id: customer.id },
                transaction: t,
            },
        );

        if (customer.customer_address.length > 0) {
            const promises = customer.customer_address
                .map((address) => models.customer_address
                    .update(
                        address,
                        { where: { customer_id: customer.id }, transaction: t },
                    ));
            await Promise.all(promises);
        }

        const newCar = await updateCar(car, customer.id, t);

        if (newCar.error) {
            return standardResponse(true, newCar.httpCode, newCar.message);
        }

        await updatePolicyWithDetails(req.body, car.id, customer.id, t);

        await t.commit();

        const policy2Update = await queryForGetPolicy({ agency_id, id });

        return standardResponse(
            false,
            200,
            'La poliza se actualizo correctamente',
            policy2Update,
        );
    } catch (error) {
        await t.rollback();
        return standardResponse(true, 500, error.message);
    }
};

module.exports = updatePolicy;
