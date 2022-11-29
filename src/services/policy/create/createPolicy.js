const models = require('../../../models');
// const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');

const createPolicy = async (body, cardId, customerId, t) => {
    const {
        number_extension, date_issue,
        beginning_effective_date, end_effective_date,
        agency_id, policy_type_id, bank_id, warranty_id,
    } = body;

    const polizaObject = {
        number_extension,
        date_issue,
        beginning_effective_date,
        end_effective_date,
        agency_id,
        policy_type_id,
        bank_id,
        warranty_id,
    };

    const newPolicy = plainObject(await models.policy.create(polizaObject, { transaction: t }));

    const policyDetail = {
        policy_id: newPolicy.id,
        car_id: cardId,
        customer_id: customerId,
    };

    await models.policy_detail.create(policyDetail, { transaction: t });

    return newPolicy;
};

module.exports = createPolicy;
