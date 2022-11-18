const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class policy_detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            policy_detail.belongsTo(models.policy, {
                foreignKey: 'policy_id',
                onDelete: 'RESTRICT',
            });
            policy_detail.belongsTo(models.car_dealer, {
                foreignKey: 'car_dealer_id',
                onDelete: 'RESTRICT',
            });
            policy_detail.belongsTo(models.car, {
                foreignKey: 'car_id',
                onDelete: 'RESTRICT',
            });
            policy_detail.belongsTo(models.customer, {
                foreignKey: 'customer_id',
                onDelete: 'RESTRICT',
            });
        }
    }
    policy_detail.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            policy_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'policy',
                    key: 'id',
                },
            },
            car_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'car',
                    key: 'id',
                },
            },
            car_dealer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'car_dealer',
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
    return policy_detail;
};
