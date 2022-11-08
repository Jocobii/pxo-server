const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');

const deleteUser = async (req) => {
    const { id } = req.params;
    if (!id) return standardResponse(true, 400, 'El id del usuario es requerido');

    const user = await models.User.findOne({ where: { id, isActive: true } });

    if (!user) return standardResponse(true, 401, 'El usuario no fue encontrado');

    await user.update({ isActive: false });

    return standardResponse(false, 200, 'El usuario fue eliminado');
};

module.exports = deleteUser;
