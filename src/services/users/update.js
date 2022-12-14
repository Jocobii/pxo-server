const models = require('../../models/index');
const { plainObject } = require('../../utils/helpers');
const { standardResponse } = require('../utils/helpers');
const { encryptPassword } = require('../auth/utils/encrypt');

const updateUser = async (req) => {
    const {
        id, first_name,
        middle_name,
        first_last_name,
        second_last_name,
        email,
        agency_id,
        password,
    } = req.body;

    const user = await models.User.findOne({ where: { id, is_active: true } });

    if (!user) return standardResponse(true, 404, 'El usuario no fue encontrado');

    const userToUpdate = {
        first_name,
        middle_name,
        first_last_name,
        second_last_name,
        email,
        agency_id,
    };

    if (password) {
        userToUpdate.password = await encryptPassword(password);
    }

    const updatedUser = plainObject(await user.update(userToUpdate));

    const userUpdeted = {
        id: updatedUser.id,
        first_name: updatedUser.first_name,
        middle_name: updatedUser.middle_name,
        first_last_name: updatedUser.first_last_name,
        second_last_name: updatedUser.second_last_name,
        email: updatedUser.email,
        agency_id: Number(updatedUser.agency_id),
    };

    return standardResponse(false, 200, 'El usuario fue actualizado', userUpdeted);
};

module.exports = updateUser;
