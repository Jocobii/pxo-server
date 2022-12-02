const create = require('./create');
const getAll = require('./read/getAll');
const getOne = require('./read/getOne');
const update = require('./update');
const deleteCustomer = require('./delete');

module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleteCustomer,
};
