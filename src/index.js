const express = require('express');
const cors = require('cors');
const { engine } = require('express-handlebars');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const initDayjs = require('./config/dayjs');
require('./models');
const { errorHandler, notFound, jwtErrorHandler } = require('./middlewares/errorsHandlers');
const corsOptions = require('./middlewares/cors');
const jwt = require('./middlewares/jwt');

const app = express();
const PORT = process.env.PORT || 5001;

initDayjs();
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/', require('./v1/routes/router'));

app.use(notFound);
app.use(errorHandler);
app.use(jwtErrorHandler);
app.listen(PORT, () => {
    console.log(`🤓 Server listening on port ${PORT}...`);
});
