const create = require('./create/create');
const update = require('./update');
const getAll = require('./read/getAll');
const { getOne } = require('./read/getOne');
const validate = require('./validations/validateNumber');
const { createContract } = require('./pdf');
const deletePolicy = require('./delete');

module.exports = {
    create,
    update,
    getAll,
    getOne,
    validate,
    createContract,
    deletePolicy,
};
