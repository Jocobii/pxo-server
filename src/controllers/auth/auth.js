const auth = require('../../services/auth');

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
    const { code } = req.body;

    const response = code
        ? await auth.resetPasswordWithCode(req, res)
        : await auth.resetPasswordWithoutCode(req, res);

    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const sendCodeRecovery = async (req, res) => {
    const response = await auth.sendCode(req, res);
    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const logout = async (req, res) => {
    const response = await auth.logout(req, res);
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
    sendCodeRecovery,
    logout,
};
