const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');

const deletePolicy = async (req) => {
    const t = await models.sequelize.transaction();
    try {
        const { id } = req.body;
        const policy = await models.policy.findOne({
            attributes: ['id'],
            where: {
                id,
                is_active: true,
            },
            raw: true,
        });

        if (!policy) {
            return standardResponse(
                true,
                404,
                'La poliza no existe',
            );
        }

        const { car_id } = await models.policy_detail.findOne({
            attributes: ['car_id'],
            where: {
                id: policy.id,
                is_active: true,
            },
            raw: true,
        });

        await Promise.all([
            models.policy.update({ is_active: false }, { where: { id }, transaction: t }),
            models.policy_detail.update(
                { is_active: false },
                {
                    where: { policy_id: id },
                    transaction: t,
                },
            ),
            models.car.update({ is_active: false }, { where: { id: car_id }, transaction: t }),
        ]);

        await t.commit();
        return standardResponse(
            false,
            200,
            'La poliza se elimino correctamente',
        );
    } catch (error) {
        await t.rollback();
        return standardResponse(true, 500, error.message);
    }
};

module.exports = deletePolicy;
