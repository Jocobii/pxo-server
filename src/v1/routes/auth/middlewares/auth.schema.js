const Validator = require('fastest-validator');
const { getSchemaErrors } = require('../../../../utils/schemas');

const validator = new Validator();

const validateRecoveryPassword = (req, res, next) => {
    const recoverySchema = validator.compile({
        email: {
            type: 'email',
            min: 5,
            max: 30,
            label: 'Correo electronico',
            messages: { email: 'El correo electronico no es valido' },
        },
        oldPassword: { type: 'string', min: 3, max: 30 },
        newPassword: { type: 'string', min: 3, max: 30 },
    });
    const schema = getSchemaErrors(recoverySchema(req.body));

    if (schema.error) {
        res.status(400).json(schema);
    } else next();
};

const validateSignIn = (req, res, next) => {
    const signInSchema = validator.compile({
        email: { type: 'string', min: 3, max: 30 },
        password: { type: 'string', min: 5, max: 255 },
    });

    const schema = getSchemaErrors(signInSchema(req.body));
    if (schema.error) {
        res.status(400).json(schema);
    } else next();
};

const validateSignUp = (req, res, next) => {
    const signInSchema = validator.compile({
        first_name: { type: 'string', min: 3, max: 30 },
        first_last_name: { type: 'string', min: 3, max: 30 },
        email: { type: 'string', min: 3, max: 30 },
        password: { type: 'string', min: 5, max: 255 },
    });

    const schema = getSchemaErrors(signInSchema(req.body));
    if (schema.error) {
        res.status(400).json(schema);
    } else next();
};

module.exports = {
    validateRecoveryPassword,
    validateSignIn,
    validateSignUp,
};
