const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');
const createCar = require('./createCar');
const createPolicyWithDetails = require('./createPolicy');

const createPolicy = async (req) => {
    const t = await models.sequelize.transaction();

    try {
        const { number_extension, car, customer } = req.body;

        const policyExists = await models.policy.findOne({
            where: {
                number_extension,
                is_active: true,
            },
        });

        if (policyExists) {
            return standardResponse(
                true,
                404,
                'La poliza ya existe en la base de datos',
            );
        }

        let newCustomerObject = null;

        if (customer?.id) {
            newCustomerObject = plainObject(await models.customer.update(
                customer,
                { where: { id: customer.id } },
                { transaction: t },
            ));

            if (customer.customer_address.length > 0) {
                const promises = customer.customer_address.map((address) => models.customer_address
                    .update(
                        address,
                        { where: { customer_id: customer.id }, transaction: t },
                    ));
                const address = await Promise.all(promises);
                newCustomerObject.customer_address = address;
            }
        }

        if (!customer?.id) {
            // TODO: Create and validate with own schema (customer schema)
            const newCustomer = plainObject(await models
                .customer.create(customer, { transaction: t }));

            const customerAddress = plainObject(await models.customer_address.bulkCreate(
                customer.customer_address.map((address) => ({
                    ...address,
                    customer_id: newCustomer.id,
                })),
                { transaction: t },
            ));

            newCustomerObject = {
                ...newCustomer,
                customer_address: customerAddress,
            };
        }

        const customerId = customer?.id
            ? customer?.id : newCustomerObject?.id;

        const newCar = await createCar(car, customerId, t);

        if (newCar.error) {
            return standardResponse(true, newCar.httpCode, newCar.message);
        }

        const policyWithDetails = await createPolicyWithDetails(req.body, newCar.id, customerId, t);

        const data = {
            ...policyWithDetails,
            car: newCar,
            customer: newCustomerObject,
        };

        await t.commit();

        return standardResponse(
            false,
            200,
            'La poliza se creo correctamente',
            data,
        );
    } catch (error) {
        await t.rollback();
        return standardResponse(true, 500, error.message);
    }
};

module.exports = createPolicy;
