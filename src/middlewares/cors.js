require('dotenv').config();

const whitelist = [process.env.BASE_URL, 'http://example2.com'];

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
