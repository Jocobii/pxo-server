const standardResponse = (error = false, httpCode = 200, message = '', data = {}, info = {}) => ({
    error,
    httpCode,
    message,
    data,
    info,
});

module.exports = {
    standardResponse,
};
