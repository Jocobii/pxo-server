const dayjs = require('dayjs');

const createUserObject = (object) => ({
    name: object.name,
    middle_name: object.middle_name,
    first_last_name: object.first_last_name,
    second_last_name: object.second_last_name,
    email: object.email,
    rfc: object.rfc,
    is_company: object.is_company,
    date_incorporation_company: dayjs(object.date_incorporation_company).format('YYYY-MM-DD') || null,
    customer_address: object.customer_address,
});

module.exports = createUserObject;
