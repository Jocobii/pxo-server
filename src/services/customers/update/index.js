const models = require('../../../models');
const createUserObject = require('../adapters/createUserObject');
const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');

const ADDRESS_FIELDS = ['customer_id', 'street', 'external_number', 'inner_number', 'district', 'zip_code', 'city_id', 'is_active'];

const updateCustomer = async (req) => {
    try {
        const { id, customer_addresses } = req.body;

        const exists = await models.customer.findOne({
            attributes: ['id'],
            where: { id, is_active: true },
            raw: true,
        });
        if (!exists) return standardResponse(true, 404, 'El cliente no existe');

        const newCustomerObject = createUserObject(req.body);

        await models.customer
            .update(
                newCustomerObject,
                { where: { id } },
            );

        const customerAddress = plainObject(await models.customer_address.bulkCreate(
            customer_addresses.map((address) => ({
                ...address,
                customer_id: id,
            })),
            { updateOnDuplicate: ADDRESS_FIELDS },
        ));

        const customer = {
            ...newCustomerObject,
            customer_addresses: customerAddress,
        };

        return standardResponse(
            false,
            200,
            'El cliente se actualizo correctamente',
            customer,
        );
    } catch (error) {
        return standardResponse(true, 500, error.message);
    }
};

module.exports = updateCustomer;
