const create = require('./create/create');
const update = require('./update');
const getAll = require('./read/getAll');
const { getOne } = require('./read/getOne');
const validate = require('./validations/validateNumber');

module.exports = {
    create,
    update,
    getAll,
    getOne,
    validate,
};
