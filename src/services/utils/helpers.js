const standardResponse = (error = false, message = '', data = {}, info = {}) => ({
    error,
    message,
    data,
    info,
});

module.exports = {
    standardResponse,
};
