require('dotenv').config();

const whitelist = [process.env.BASE_URL, 'https://pxo-app.vercel.app/', 'https://pxo-app.vercel.app'];

const corsOptions = {
    origin(origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

module.exports = corsOptions;
