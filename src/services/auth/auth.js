require('dotenv').config();
const dayjs = require('dayjs');
const models = require('../../models');
const { generateToken } = require('./utils/jwt');
const { standardResponse } = require('../utils/helpers');
const { encryptPassword, comparePassword } = require('./utils/encrypt');
const { plainObject, generateCode } = require('../../utils/helpers');
const resetPasswordCode = require('./templates/emailTemplate');
const { sendEmail } = require('./utils/email');

const logout = async (req) => {
    const { email } = req.body;
    const user = await models.User.findOne({ attributes: ['id', 'access_token'], where: { email }, raw: true });

    if (!user) return standardResponse(true, 422, 'Usuario o contrasena incorrecta');

    await models.User.update({ access_token: null }, { where: { id: user.id } });

    return standardResponse(false, 200, 'Logout successful');
};

const signIn = async (req) => {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email }, raw: true });

    if (!user) return standardResponse(true, 422, 'Usuario o contrasena incorrecta');

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) return standardResponse(true, 422, 'Usuario o contrasena incorrecta');

    const token = generateToken(user);

    await models.User.update({ access_token: token }, { where: { id: user.id } });

    const userData = {
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        first_last_name: user.first_last_name,
        second_last_name: user.second_last_name,
        email: user.email,
        accessToken: token,
    };

    return {
        error: false,
        data: { ...userData },
        message: 'Login successful',
        info: {},
    };
};

const recoveryPasswordWithoutCode = async (req) => {
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

const recoveryPasswordWithCode = async (req) => {
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

const sendCodeRecovery = async (req) => {
    const { email } = req.body;

    if (!email) return standardResponse(true, 400, 'El email es requerido');

    const user = await models.User.findOne({ where: { email }, raw: true });

    if (!user) return standardResponse(true, 404, 'El usuario no existe');

    const code = generateCode();

    await models.User.update({ code_recovery: code }, { where: { id: user.id } });

    const msg = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: 'Codigo recuperacion',
        text: 'Código de recuperación',
        html: resetPasswordCode(code),
    };

    const itWasSended = await sendEmail(msg);

    if (!itWasSended) return standardResponse(true, 500, 'No se pudo enviar el correo');

    return standardResponse(false, 200, 'El codigo de recuperacion se envio correctamente a su correo');
};

const signUp = async (req) => {
    try {
        const {
            first_name,
            middle_name,
            first_last_name,
            second_last_name,
            email,
            password,
        } = req.body;

        const user = await models.User.findOne({ where: { email } });

        if (user) return standardResponse(true, 404, 'El usuario ya existe en la base de datos');

        const encryptedPassword = await encryptPassword(password);

        const newUserObject = {
            first_name,
            middle_name,
            first_last_name,
            second_last_name,
            email,
            password: encryptedPassword,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        };

        const newUser = plainObject(await models.User.create(newUserObject));

        if (!newUser.id) return standardResponse(true, 422, 'No se pudo crear el usuario');

        const newUserCreated = {
            id: newUser.id,
            first_name: newUser.first_name,
            middle_name: newUser.middle_name,
            first_last_name: newUser.first_last_name,
            second_last_name: newUser.second_last_name,
            email: newUser.email,
        };
        return standardResponse(false, 200, 'El usuario se creo correctamente', newUserCreated);
    } catch (error) {
        return standardResponse(true, 500, error.message);
    }
};

module.exports = {
    signIn,
    signUp,
    recoveryPasswordWithoutCode,
    recoveryPasswordWithCode,
    sendCodeRecovery,
    logout,
};
