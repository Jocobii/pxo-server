const Validator = require('fastest-validator');
const { getSchemaErrors } = require('../../../../utils/schemas');

const validator = new Validator();

const customerCreateSchema = (req, res, next) => {
    const { is_company, date_incorporation_company } = req.body;
    const rawData = { ...req.body };

    const schemaCustomer = {
        name: {
            type: 'string',
            min: 2,
            max: 100,
            label: 'Nombre',
            messages: { email: 'El nombre es obligatorio' },
        },
        middle_name: {
            type: 'string',
            max: 30,
            label: 'Segundo Nombre',
            optional: true,
            nullable: true,
        },
        first_last_name: {
            type: 'string',
            max: 30,
            label: 'Apellido paterno',
            optional: is_company === true,
            nullable: is_company === true,
        },
        second_last_name: {
            type: 'string',
            max: 30,
            label: 'Apellido materno',
            optional: true,
            nullable: true,
        },
        email: {
            type: 'email',
            min: 5,
            max: 100,
            label: 'Correo electronico',
            messages: { email: 'El correo electronico no es valido' },
        },
        rfc: {
            type: 'string',
            max: 30,
            label: 'RFC',
        },
        is_company: {
            type: 'boolean',
        },
        customer_address: {
            type: 'array',
            items: {
                type: 'object',
                props: {
                    street: {
                        type: 'string',
                        max: 100,
                    },
                    external_number: {
                        type: 'string',
                        max: 10,
                    },
                    internal_number: {
                        type: 'string',
                        max: 10,
                        optional: true,
                        nullable: true,
                    },
                    district: {
                        type: 'string',
                        max: 50,
                    },
                    zip_code: {
                        type: 'string',
                        max: 10,
                    },
                    city_id: {
                        type: 'number',
                    },
                },
            },
        },
    };

    if (is_company) {
        schemaCustomer.date_incorporation_company = { type: 'date' };
        rawData.date_incorporation_company = new Date(date_incorporation_company);
    }
    const customerSchema = validator.compile(schemaCustomer);

    const schema = getSchemaErrors(customerSchema(rawData));

    if (schema.error) {
        res.status(400).json(schema);
    } else next();
};

module.exports = {
    customerCreateSchema,
};
