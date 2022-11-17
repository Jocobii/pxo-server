const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(model) {
            User.belongsTo(model.agency, {
                foreignKey: 'agency_id',
                onDelete: 'RESTRICT',
            });
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
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        access_token: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        code_recovery: {
            allowNull: true,
            type: DataTypes.STRING(10),
        },
        agency_id: {
            allowNull: false,
            defaultValue: 1,
            type: DataTypes.INTEGER,
            references: {
                model: 'agency',
                key: 'id',
            },
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        is_active: {
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
