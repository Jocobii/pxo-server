const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(model) {
            car.belongsTo(model.category, {
                foreignKey: 'category_id',
                onDelete: 'RESTRICT',
            });
            car.belongsTo(model.version, {
                foreignKey: 'version_id',
                onDelete: 'RESTRICT',
            });
        }
    }
    car.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            year: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            mileage: {
                type: DataTypes.CHAR(10),
                allowNull: true,
            },
            series: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            vin: {
                type: DataTypes.STRING(30),
                allowNull: true,
                unique: true,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'category',
                    key: 'id',
                },
            },
            version_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'version',
                    key: 'id',
                },
            },
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'customer',
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
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );
    return car;
};
