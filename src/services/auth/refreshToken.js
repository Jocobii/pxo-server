const models = require('../../models');
const { generateToken } = require('./utils/jwt');
const { standardResponse } = require('../utils/helpers');

const refreshToken = async (req) => {
    try {
        const { currentToken } = req.body;

        if (!currentToken) return standardResponse(true, 400, 'El token es requerido');
        const user = await models.User.findOne({ attributes: ['id'], where: { access_token: currentToken } });

        const newAccessToken = generateToken(user);
        await models.User.update({ access_token: newAccessToken }, { where: { id: user.id } });

        return standardResponse(false, 200, 'El token se ha actualizado correctamente', { accessToken: newAccessToken });
    } catch (error) {
        return standardResponse(true, 500, 'Ha ocurrido un error en el servidor');
    }
};

module.exports = refreshToken;
