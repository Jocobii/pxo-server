const models = require('../models/index');

const getAllUsers = async () => models.User.findAll();

module.exports = {
    getAllUsers,
};
