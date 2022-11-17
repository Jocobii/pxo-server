const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class customer_address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            customer_address.belongsTo(models.customer, {
                foreignKey: 'customer_id',
                onDelete: 'RESTRICT',
            });
            customer_address.belongsTo(models.city, {
                foreignKey: 'city_id',
                onDelete: 'RESTRICT',
            });
        }
    }
    customer_address.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'customer',
                    key: 'id',
                },
            },
            street: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            external_number: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            inner_number: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            district: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            zip_code: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            city_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'city',
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
    return customer_address;
};
