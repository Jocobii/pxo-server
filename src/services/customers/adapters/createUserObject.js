const dayjs = require('dayjs');

const createUserObject = (object) => ({
    id: Number(object?.id) || null,
    name: object.name,
    middle_name: object.middle_name,
    first_last_name: object.first_last_name,
    second_last_name: object.second_last_name,
    email: object.email,
    cellPhone: object.cellPhone,
    rfc: object.rfc,
    is_company: object.is_company === 'true' ? 1 : 0,
    date_incorporation_company: dayjs(object.date_incorporation_company).format('YYYY-MM-DD') || null,
    customer_address: object.customer_address,
});

module.exports = createUserObject;
