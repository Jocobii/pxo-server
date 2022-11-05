const { standardResponse } = require('../services/utils/helpers');

const notFound = (req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found 🔍 - ${req.originalUrl}`);
    next(error);
};

const errorHandler = (err, _req, res) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    return res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack, // <--- hide stack in production
    });
};

const jwtErrorHandler = (err, _req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        res.status(401).json(standardResponse(true, err.message));
    }
    next();
};
module.exports = {
    notFound,
    errorHandler,
    jwtErrorHandler,
};
