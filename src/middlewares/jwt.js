const { expressjwt } = require('express-jwt');

function jwt() {
    const SECRET = process.env.JWT_SECRET;
    const ALGORITHM = process.env.JWT_ALGORITHMS;

    return expressjwt({ secret: SECRET, algorithms: [ALGORITHM] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/auth/sign-in',
            '/api/v1/auth/sign-up',
            '/api/v1/auth/logout',
        ],
    });
}

module.exports = jwt;
