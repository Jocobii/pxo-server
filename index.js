const express = require('express');
const cors = require('cors');
const { engine } = require('express-handlebars');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const initDayjs = require('./src/config/dayjs');
require('./src/models');
const { errorHandler, notFound, jwtErrorHandler } = require('./src/middlewares/errorsHandlers');
const corsOptions = require('./src/middlewares/cors');
const jwt = require('./src/middlewares/jwt');

const app = express();
const PORT = process.env.PORT || 5001;

initDayjs();
app.use('/public', express.static(path.join(__dirname, './src/public')));

if (process.env.MORGAN === 'yes' && process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json({ limit: '50mb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(cors(corsOptions));
app.use(jwt());
app.use('/', require('./src/v1/routes/router'));

app.use(notFound);
app.use(errorHandler);
app.use(jwtErrorHandler);

app.listen(PORT, () => {
    console.log(`🤓 Server listening on port ${PORT}...`);
});

module.exports = app;
