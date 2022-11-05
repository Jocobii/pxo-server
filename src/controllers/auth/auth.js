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
    const { code } = req.body;

    const response = code
        ? await auth.recoveryPasswordWithCode(req, res)
        : await auth.recoveryPasswordWithoutCode(req, res);

    if (response.error) {
        res.status(400).json(response);
        return;
    }
    res.json(response);
};

const sendCodeRecovery = async (req, res) => {
    const response = await auth.sendCodeRecovery(req, res);
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
};
