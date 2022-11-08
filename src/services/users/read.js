const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');

const getAllUsers = async () => {
    const users = await models.User.findAll({
        attributes: ['id', 'first_name', 'middle_name', 'first_last_name', 'second_last_name', 'email'],
        where: { isActive: true },
        order: [['id', 'DESC']],
    });

    return standardResponse(false, 200, 'Usuarios encontrados', users);
};

module.exports = getAllUsers;
