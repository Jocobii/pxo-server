const signUp = require('./signUp');
const signIn = require('./signIn');
const resetPasswordWithCode = require('./resetPasswordWithCode');
const resetPasswordWithoutCode = require('./resetPasswordWithoutCode');
const sendCode = require('./sendCode');
const logout = require('./logout');
const refreshToken = require('./refreshToken');

module.exports = {
    signUp,
    signIn,
    resetPasswordWithCode,
    resetPasswordWithoutCode,
    sendCode,
    logout,
    refreshToken,
};
