const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');
const createCar = require('./createCar');
const createPolicyWithDetails = require('./createPolicy');

const createPolicy = async (req) => {
    const t = await models.sequelize.transaction();
    try {
        const { car, customer } = req.body;

        let newCustomerObject = null;
        const customerExists = await models.customer.findOne({
            where: {
                email: customer.email,
                is_active: true,
            },
            raw: true,
        });
        if (customerExists?.id) customer.id = customerExists.id;

        if (customer?.id || customerExists) {
            await models.customer.update(
                customer,
                { where: { id: customerExists.id } },
                { transaction: t },
            );

            if (customer.customer_address.length > 0) {
                const promises = customer.customer_address.map((address) => models.customer_address
                    .update(
                        address,
                        { where: { customer_id: customerExists.id }, transaction: t },
                    ));
                await Promise.all(promises);
            }
            newCustomerObject = {
                ...customer,
                customer_addresses: customer.customer_address,
                id: customerExists.id,
            };
        }

        if (!customer?.id && !customerExists) {
            // TODO: Create and validate with own schema (customer schema)
            const newCustomer = plainObject(await models
                .customer.create({
                    ...customer,
                    is_company: customer.is_company === 'true',
                }, { transaction: t }));

            const customerAddress = plainObject(await models.customer_address.bulkCreate(
                customer.customer_address.map((address) => ({
                    ...address,
                    customer_id: newCustomer.id,
                })),
                { transaction: t },
            ));

            newCustomerObject = {
                ...newCustomer,
                customer_addresses: customerAddress,
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
            policy_detail: {
                car: newCar,
                customer: newCustomerObject,
            },
        };

        console.log('creand el business');
        await t.commit();

        return standardResponse(
            false,
            200,
            'La poliza se creo correctamente',
            data,
        );
    } catch (error) {
        console.log(error);
        await t.rollback();
        return standardResponse(true, 500, error.message);
    }
};

module.exports = createPolicy;
