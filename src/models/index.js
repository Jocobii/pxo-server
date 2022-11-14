/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );
}

fs.readdirSync(__dirname)
    .filter((file) => (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    ))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// este proceso de sync solo debe ser en DESARROLLO, para produccion se deben usar las migraciones
// para que se sincronice debe tener al final _test
// ejemplo: pxo_test

// if (process.env.NODE_ENV === 'development') sequelize.sync({ alter: true, match: /_test$/ });

sequelize
    .authenticate()
    .then(() => {
        console.log('🟢 Se ha conectado a la base de datos correctamente 🚀');
    })
    .catch((err) => {
        console.log(`🚨 ${err} 🚨`);
    });

module.exports = db;
