const Validator = require('fastest-validator');

const validator = new Validator();

const schema = {
    firstName: { type: 'string', min: 3, max: 30 },
    firstLastName: { type: 'string', min: 3, max: 30 },
    email: { type: 'string', min: 3, max: 30 },
    password: { type: 'string', min: 5, max: 255 },
};

const validateUserSchema = validator.compile(schema);

module.exports = validateUserSchema;
