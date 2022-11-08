const models = require('../../models');
const { standardResponse } = require('../utils/helpers');

const logout = async (req) => {
    const { email } = req.body;
    const user = await models.User.findOne({ attributes: ['id', 'access_token'], where: { email }, raw: true });

    if (!user) return standardResponse(true, 422, 'Usuario o contrasena incorrecta');

    await models.User.update({ access_token: null }, { where: { id: user.id } });

    return standardResponse(false, 200, 'Logout successful');
};

module.exports = logout;
