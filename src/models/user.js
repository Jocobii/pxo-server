const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            console.log(models);
        }
    }
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        first_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        middle_name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        first_last_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        second_last_name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        access_token: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return User;
};
