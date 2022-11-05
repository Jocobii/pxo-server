const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
require('./models');
const { errorHandler, notFound, jwtErrorHandler } = require('./middlewares/errorsHandlers');
const corsOptions = require('./middlewares/cors');
const jwt = require('./middlewares/jwt');

const PORT = process.env.PORT || 5000;
const app = express();

if (process.env.MORGAN === 'yes' && process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(compression());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(cors(corsOptions));
app.use(jwt());
app.use('/', require('./v1/routes/router'));

app.use(notFound);
app.use(errorHandler);
app.use(jwtErrorHandler);

app.listen(PORT, () => {
    console.log(`🤓 Server listening on port ${PORT}...`);
});
