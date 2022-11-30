const dayjs = require('dayjs');
const models = require('../../../models');
// const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');

const FINANCIADA = 1;

const generateNumberExtension = async (body) => {
    const {
        policy_type_id, date_issue, agency_id,
        warranty_id,
    } = body;
    // F 10044 22 11 0485 P 3

    // Tipo de poliza F = Fianza, P = Poliza
    // Numero de agencia
    // Anio de emision
    // Mes de emision
    // Id autoincremental
    // Tipo de garantia Premium = P, Elite = E
    // PLAZO EN ANIOS

    const agency = plainObject(await models.agency.findByPk(agency_id));
    const warranty = plainObject(await models.warranty.findByPk(warranty_id));
    const [lastPolicy] = await models.policy.findAll({
        attributes: ['id'],
        order: [['id', 'DESC']],
        limit: 1,
        raw: true,
    });
    const lastId = Number(lastPolicy?.id) || 0;
    const yearEmision = dayjs(date_issue).format('YYYY/MM/DD').split('/')[0];
    const monthEmision = dayjs(date_issue).format('YYYY/MM/DD').split('/')[1];
    const warrantyYears = Number(warranty.months) / 12;
    const numberExtension = `${Number(policy_type_id) === FINANCIADA ? 'F' : 'C'}${agency.code}${yearEmision}${monthEmision}${lastId + 1}${warranty.name === 'PREMIUM' ? 'P' : 'E'}${warrantyYears}`;
    return numberExtension;
};

const createPolicy = async (body, cardId, customerId, t) => {
    const {
        date_issue,
        beginning_effective_date, end_effective_date,
        agency_id, policy_type_id, bank_id, warranty_id,
    } = body;
    const number_extension = await generateNumberExtension(body);
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
