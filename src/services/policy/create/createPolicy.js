const models = require('../../../models');
const { GRUPO_OPTIMA_ID } = require('../../utils/constans/carDealers');
// const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');

const createPolicy = async (body, cardId, customerId, t) => {
    const {
        number_extension, date_issue,
        beginning_effective_date, end_effective_date,
    } = body;

    const polizaObject = {
        number_extension,
        date_issue,
        beginning_effective_date,
        end_effective_date,
    };

    const newPolicy = plainObject(await models.policy.create(polizaObject, { transaction: t }));

    const policyDetail = {
        policy_id: newPolicy.id,
        car_id: cardId,
        car_dealer_id: GRUPO_OPTIMA_ID,
        customer_id: customerId,
    };

    await models.policy_detail.create(policyDetail, { transaction: t });

    return newPolicy;
};

module.exports = createPolicy;
