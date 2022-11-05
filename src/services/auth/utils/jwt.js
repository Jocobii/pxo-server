require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
});

module.exports = {
    generateToken,
};
