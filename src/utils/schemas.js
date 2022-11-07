const getSchemaErrors = (errors) => {
    if (Array.isArray(errors)) {
        return {
            error: true,
            message: 'Ha ocurrido un error al momento de validar los datos',
            data: {},
            info: { errors: errors.map((e) => e.message) },
        };
    }
    return [];
};

module.exports = {
    getSchemaErrors,
};
