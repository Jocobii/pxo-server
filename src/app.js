const express = require('express');
const cors = require('cors');
const userRoutes = require('./v1/routes/users');
const db = require('./models');
const corsOptions = require('./config/cors'); // <--- import corsOptions

const app = express();

app.use(cors(corsOptions));
db.sequelize
    .authenticate()
    .then(() => {
        console.log('🚀 Se ha conectado a la base de datos correctamente 🚀');
    })
    .catch((err) => {
        console.log(`🚨 ${err} 🚨`);
    });
app.use(express.json());
app.use('/api/v1/users', userRoutes);

module.exports = app;
