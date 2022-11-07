const Validator = require('fastest-validator');
const { getSchemaErrors } = require('../../../../utils/schemas');

const validator = new Validator();

const userUpdateSchema = (req, res, next) => {
    const recoverySchema = validator.compile({
        firstName: {
            type: 'string',
            min: 2,
            max: 30,
            label: 'Nombre',
            messages: { email: 'El nombre es obligatorio' },
        },
        middleName: {
            type: 'string',
            max: 30,
            label: 'Segundo Nombre',
            optional: true,
            nullable: true,
        },
        firstLastName: {
            type: 'string',
            min: 2,
            max: 30,
            label: 'Apellido paterno',
            messages: { email: 'El Apellido paterno es obligatorio' },
        },
        secondLastName: {
            type: 'string',
            min: 2,
            max: 30,
            label: 'Apellido materno',
            messages: { email: 'El Apellido materno es obligatorio' },
            optional: true,
            nullable: true,
        },
        email: {
            type: 'email',
            min: 5,
            max: 30,
            label: 'Correo electronico',
            messages: { email: 'El correo electronico no es valido' },
        },
    });
    const schema = getSchemaErrors(recoverySchema(req.body));

    if (schema.error) {
        res.status(400).json(schema);
    } else next();
};

module.exports = {
    userUpdateSchema,
};
