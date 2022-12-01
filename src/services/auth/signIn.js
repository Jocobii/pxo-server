const models = require('../../models');
const { generateToken } = require('./utils/jwt');
const { standardResponse } = require('../utils/helpers');
const { comparePassword } = require('./utils/encrypt');

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
        agency_id: user.agency_id,
        accessToken: token,
    };

    return standardResponse(false, 200, 'Bienvenido a PXO', userData);
};

module.exports = signIn;
