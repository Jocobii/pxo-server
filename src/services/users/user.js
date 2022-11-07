const models = require('../../models/index');
const { plainObject } = require('../../utils/helpers');
const { standardResponse } = require('../utils/helpers');

const getAllUsers = async () => models.User.findAll();

const updateUser = async (req) => {
    const {
        id, firstName, middleName,
        firstLastName, secondLastName, email,
    } = req.body;

    const user = await models.User.findOne({ where: { id } });

    if (!user) return standardResponse(404, 'El usuario no fue encontrado');

    const updatedUser = plainObject(await user.update({
        first_name: firstName,
        middle_name: middleName,
        first_last_name: firstLastName,
        second_last_name: secondLastName,
        email,
    }));

    const userUpdated = {
        id: updatedUser.id,
        firstName: updatedUser.first_name,
        middleName: updatedUser.middle_name,
        firstLastName: updatedUser.first_last_name,
        secondLastName: updatedUser.second_last_name,
        email: updatedUser.email,
    };
    return standardResponse(false, 'El usuario fue actualizado', userUpdated);
};

module.exports = {
    getAllUsers,
    updateUser,
};
