const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class policy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            policy.hasOne(models.policy_detail, {
                foreignKey: 'policy_id',
                onDelete: 'RESTRICT',
            });
            policy.belongsTo(models.agency, {
                foreignKey: 'agency_id',
                onDelete: 'RESTRICT',
            });
        }
    }
    policy.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            number_extension: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            agency_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'agency',
                    key: 'id',
                },
            },
            policy_type_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'policy_type',
                    key: 'id',
                },
            },
            bank_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'bank',
                    key: 'id',
                },
            },
            warranty_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'warranty',
                    key: 'id',
                },
                defaultValue: 1,
            },
            date_issue: {
                allowNull: false,
                type: DataTypes.DATEONLY,
            },
            beginning_effective_date: {
                allowNull: false,
                type: DataTypes.DATEONLY,
            },
            end_effective_date: {
                allowNull: false,
                type: DataTypes.DATEONLY,
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
    return policy;
};
