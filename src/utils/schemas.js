const getSchemaErrors = (errors) => {
    try {
        if (Array.isArray(errors)) {
            return {
                error: true,
                message: 'Ha ocurrido un error al momento de validar los datos',
                data: {},
                info: { errors: errors.map((e) => e.message) },
            };
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

module.exports = {
    getSchemaErrors,
};
