require('dotenv').config();
const models = require('../../models');
const { standardResponse } = require('../utils/helpers');
const { encryptPassword, comparePassword } = require('./utils/encrypt');

const resetPasswordWithoutCode = async (req) => {
    const { email, oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) return standardResponse(true, 422, 'La nueva contrasena no puede ser igual a la anterior');

    const user = await models.User.findOne({ where: { email } });

    if (!user) return standardResponse(true, 404, 'El usuario no existe');

    const areSamePassword = await comparePassword(oldPassword, user.password);

    if (!areSamePassword) return standardResponse(true, 422, 'La contrasena es incorrecta');

    const encryptedNewPassword = await encryptPassword(newPassword);

    await models.User.update({ password: encryptedNewPassword }, { where: { id: user.id } });

    return standardResponse(false, 200, 'La contrasena se actualizo correctamente');
};

module.exports = resetPasswordWithoutCode;
