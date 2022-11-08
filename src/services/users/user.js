const models = require('../../models/index');
const { plainObject } = require('../../utils/helpers');
const { standardResponse } = require('../utils/helpers');
const { encryptPassword } = require('../auth/utils/encrypt');

const getAllUsers = async () => {
    const users = await models.User.findAll({
        attributes: ['id', 'first_name', 'middle_name', 'first_last_name', 'second_last_name', 'email'],
        where: { isActive: true },
        order: [['id', 'DESC']],
    });

    return standardResponse(false, 200, 'Usuarios encontrados', users);
};

const updateUser = async (req) => {
    const {
        id, first_name,
        middle_name,
        first_last_name,
        second_last_name,
        email,
        password,
    } = req.body;

    const user = await models.User.findOne({ where: { id, isActive: true } });

    if (!user) return standardResponse(true, 404, 'El usuario no fue encontrado');

    const userToUpdate = {
        first_name,
        middle_name,
        first_last_name,
        second_last_name,
        email,
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
    };

    return standardResponse(false, 200, 'El usuario fue actualizado', userUpdeted);
};

const deleteUser = async (req) => {
    const { id } = req.params;
    if (!id) return standardResponse(true, 400, 'El id del usuario es requerido');

    const user = await models.User.findOne({ where: { id, isActive: true } });

    if (!user) return standardResponse(true, 401, 'El usuario no fue encontrado');

    await user.update({ isActive: false });

    return standardResponse(false, 200, 'El usuario fue eliminado');
};

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
};
