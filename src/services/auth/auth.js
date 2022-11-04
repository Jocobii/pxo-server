require('dotenv').config();
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const models = require('../../models');
const { standardResponse } = require('../utils/helpers');
const validateUserSchema = require('../users/schema/user.schema');
const { encryptPassword, comparePassword } = require('./utils/encrypt');

const signIn = async (req) => {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) return standardResponse(true, 'Usuario o contrasena incorrecta');

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) return standardResponse(true, 'Usuario o contrasena incorrecta');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86_400,
    });

    await models.User.update({ access_token: token }, { where: { id: user.id } });

    return {
        error: false,
        data: { token },
        message: 'Login successful',
        info: {},
    };
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

        const errors = validateUserSchema(req.body);

        if (Array.isArray(errors)) {
            return {
                error: true,
                message: 'Algunos campos no son obligatorios',
                data: {},
                info: {
                    errores: errors.map((e) => e.message),
                },
            };
        }

        const user = await models.User.findOne({ where: { email } });

        if (user) {
            return {
                error: true,
                message: 'El usuario ya existe en la base de datos',
                data: {},
                info: {},
            };
        }

        const encryptedPassword = await encryptPassword(password);

        const newUser = {
            first_name: firstName,
            middle_name: middleName,
            first_last_name: firstLastName,
            second_last_name: secondLastName,
            email,
            password: encryptedPassword,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        };

        await models.User.create(newUser);

        return {
            error: false,
            data: newUser,
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
};
