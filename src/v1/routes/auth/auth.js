const express = require('express');

const router = express.Router();
const auth = require('../../../controllers/auth/auth');
const {
    validateSignIn,
    validateSignUp,
} = require('./middlewares/auth.schema');

router
    .post('/sign-in', validateSignIn, auth.signIn)
    .post('/sign-up', validateSignUp, auth.signUp)
    .post('/logout', auth.logout)
    .post('/recovery-password', auth.recoveryPassword)
    .post('/send-code-recovery', auth.sendCodeRecovery);

module.exports = router;
