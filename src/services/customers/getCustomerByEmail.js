const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');

const getCustomerByEmail = async (email) => {
    try {
        const where = { is_active: true };

        where.email = email.trim();
        const customer = await models.customer.findOne({
            attributes: { exclude: ['deleted_at', 'is_active'] },
            where,
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
            customer,
        );
    } catch (error) {
        return standardResponse(
            true,
            500,
            'Ha ocurrido un error en el servdor',
        );
    }
};

module.exports = getCustomerByEmail;
