require('dotenv').config();
const dayjs = require('dayjs');
const models = require('../../models');
const { generateToken } = require('./utils/jwt');
const { standardResponse } = require('../utils/helpers');
const { encryptPassword, comparePassword } = require('./utils/encrypt');
const { plainObject } = require('../../utils/helpers');

const signIn = async (req) => {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email }, raw: true });

    if (!user) return standardResponse(true, 'Usuario o contrasena incorrecta');

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) return standardResponse(true, 'Usuario o contrasena incorrecta');

    const token = generateToken(user);

    await models.User.update({ access_token: token }, { where: { id: user.id } });

    const userData = {
        id: user.id,
        firstName: user.first_name,
        middleName: user.middle_name,
        firstLastName: user.first_last_name,
        secondLastName: user.second_last_name,
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

const recoveryPassword = async (req) => {
    const { email, oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) return standardResponse(true, 'La nueva contrasena no puede ser igual a la anterior');

    const user = await models.User.findOne({ where: { email } });

    if (!user) return standardResponse(true, 'El usuario no existe');

    const areSamePassword = await comparePassword(oldPassword, user.password);

    if (!areSamePassword) return standardResponse(true, 'La contrasena es incorrecta');

    const encryptedNewPassword = await encryptPassword(newPassword);

    await models.User.update({ password: encryptedNewPassword }, { where: { id: user.id } });

    return standardResponse(false, 'La contrasena se actualizo correctamente');
};

const signUp = async (req) => {
    try {
        const {
            firstName,
            middleName,
            firstLastName,
            secondLastName,
            email,
            password,
        } = req.body;

        const user = await models.User.findOne({ where: { email } });

        if (user) return standardResponse(true, 'El usuario ya existe en la base de datos');

        const encryptedPassword = await encryptPassword(password);

        const newUserObject = {
            first_name: firstName,
            middle_name: middleName,
            first_last_name: firstLastName,
            second_last_name: secondLastName,
            email,
            password: encryptedPassword,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        };

        const newUser = plainObject(await models.User.create(newUserObject));

        if (!newUser.id) return standardResponse(true, 'No se pudo crear el usuario');

        return {
            error: false,
            data: {},
            message: 'User created successfully',
            info: {},
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
            data: {},
            info: {},
        };
    }
};

module.exports = {
    signIn,
    signUp,
    recoveryPassword,
};
