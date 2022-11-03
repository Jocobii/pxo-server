const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoutes = require('./v1/routes/users');
require('./models');
const { errorHandler, notFound } = require('./middlewares/errorsHandlers');
const corsOptions = require('./middlewares/cors');

const PORT = process.env.PORT || 5000;
const app = express();

if (process.env.MORGAN === 'yes' && process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use('/api/v1/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🤓 Server listening on port ${PORT}...`);
});
