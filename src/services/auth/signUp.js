const dayjs = require('dayjs');
const models = require('../../models');
const { standardResponse } = require('../utils/helpers');
const { encryptPassword } = require('./utils/encrypt');
const { plainObject } = require('../../utils/helpers');

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

module.exports = signUp;
