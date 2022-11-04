const bcrypt = require('bcrypt');

const saltRounds = 10;

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (password, receivedPassword) => bcrypt
    .compare(password, receivedPassword);

module.exports = {
    encryptPassword,
    comparePassword,
};
