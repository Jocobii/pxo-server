const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(model) {
            car.belongsTo(model.sub_brand, {
                foreignKey: 'sub_brand_id',
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
                type: DataTypes.CHAR(4),
                allowNull: true,
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
            },
            sub_brand_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'sub_brand',
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
