require('dotenv').config();
const models = require('../../models');
const { standardResponse } = require('../utils/helpers');
const { generateCode } = require('../../utils/helpers');
const resetPasswordCode = require('./templates/emailTemplate');
const { sendEmail } = require('./utils/email');

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

module.exports = sendCodeRecovery;
