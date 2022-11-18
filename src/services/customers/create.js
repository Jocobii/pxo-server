const models = require('../../models');
const createUserObject = require('./adapters/createUserObject');
const { standardResponse } = require('../utils/helpers');
const { plainObject } = require('../../utils/helpers');

const createCustomer = async (req) => {
    try {
        const { email, customer_address } = req.body;

        const user = await models.customer.findOne({ where: { email, is_active: true } });

        if (user) {
            return standardResponse(
                true,
                404,
                'El cliente ya existe en la base de datos',
            );
        }

        const newCustomerObject = createUserObject(req.body);

        const newCustomer = plainObject(
            await models.customer.create(newCustomerObject),
        );

        if (!newCustomer.id) return standardResponse(true, 422, 'No se pudo crear el cliente');

        const customerAddress = plainObject(await models.customer_address.bulkCreate(
            customer_address.map((address) => ({
                ...address,
                customer_id: newCustomer.id,
            })),
        ));

        const customer = {
            ...newCustomer,
            customer_address: customerAddress,
        };

        return standardResponse(
            false,
            200,
            'El cliente se creo correctamente',
            customer,
        );
    } catch (error) {
        return standardResponse(true, 500, error.message);
    }
};

module.exports = createCustomer;
