const auth = require('../../services/auth/auth');

const signIn = async (req, res) => {
    const response = await auth.signIn(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const signUp = async (req, res) => {
    const response = await auth.signUp(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const recoveryPassword = async (req, res) => {
    const response = await auth.recoveryPassword(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};
module.exports = {
    signIn,
    signUp,
    recoveryPassword,
};
