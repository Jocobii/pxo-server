require('dotenv').config();
const models = require('../../models');
const { standardResponse } = require('../utils/helpers');
const { encryptPassword } = require('./utils/encrypt');

const resetPasswordWithCode = async (req) => {
    const { email, code, newPassword } = req.body;

    const user = await models.User.findOne({
        attributes: ['id', 'code_recovery'],
        where: { email },
        raw: true,
    });

    if (!user) return standardResponse(true, 404, 'El usuario no existe');

    if (code !== user.code_recovery) return standardResponse(true, 400, 'El codigo es incorrecto');

    const encryptedNewPassword = await encryptPassword(newPassword);

    await models.User.update({
        password: encryptedNewPassword,
        code_recovery: null,
    }, { where: { id: user.id } });

    return standardResponse(false, 200, 'La contrasena se actualizo correctamente');
};
module.exports = resetPasswordWithCode;
