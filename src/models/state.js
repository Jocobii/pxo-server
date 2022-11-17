const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class state extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(model) {
            state.belongsTo(model.country, {
                foreignKey: 'country_id',
                onDelete: 'RESTRICT',
            });
        }
    }
    state.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            key: {
                type: DataTypes.CHAR(5),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            country_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'country',
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
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            sequelize,
        },
    );
    return state;
};
