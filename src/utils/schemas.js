const getSchemaErrors = (errors) => {
    if (Array.isArray(errors)) {
        return {
            error: true, message: '', data: {}, info: { errores: errors.map((e) => e.message) },
        };
    }
    return [];
};

module.exports = {
    getSchemaErrors,
};
