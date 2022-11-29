const models = require('../../../models');

const updatePolicy = async (body, cardId, customerId, t) => {
    const {
        id,
        number_extension, date_issue,
        beginning_effective_date, end_effective_date,
        agency_id, policy_type_id, bank_id, warranty_id,
    } = body;

    const polizaObject = {
        id,
        number_extension,
        date_issue,
        beginning_effective_date,
        end_effective_date,
        agency_id,
        policy_type_id,
        bank_id,
        warranty_id,
    };

    await models.policy.update(polizaObject, { where: { id }, transaction: t });

    const policyDetail = {
        policy_id: id,
        car_id: cardId,
        customer_id: customerId,
    };

    await models.policy_detail.update(policyDetail, { where: { policy_id: id }, transaction: t });
};

module.exports = updatePolicy;
