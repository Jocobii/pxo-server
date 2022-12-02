const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');

const deleteCustomer = async (req) => {
    try {
        const { id } = req.body;

        const exists = await models.customer.findOne({
            attributes: ['id'],
            where: { id, is_active: true },
            raw: true,
        });
        if (!exists) return standardResponse(true, 404, 'El cliente no existe');

        const haveDependencies = await models.policy_detail.findOne({
            attributes: ['id'],
            where: { customer_id: id, id, is_active: true },
            raw: true,
        });

        if (haveDependencies) return standardResponse(true, 400, 'El cliente no puede ser eliminado porque esta en uso');

        await models.customer
            .update(
                { is_active: false },
                { where: { id } },
            );

        await models.customer_address
            .update(
                { is_active: false },
                { where: { customer_id: id } },
            );

        return standardResponse(
            false,
            200,
            'El cliente se elimino correctamente',
        );
    } catch (error) {
        return standardResponse(true, 500, error.message);
    }
};

module.exports = deleteCustomer;
