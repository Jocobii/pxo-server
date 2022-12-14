const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class agency extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            agency.belongsTo(models.city, {
                foreignKey: 'city_id',
                onDelete: 'RESTRICT',
            });
            agency.hasMany(models.policy, {
                foreignKey: 'agency_id',
                onDelete: 'RESTRICT',
            });
        }
    }
    agency.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            code: {
                type: DataTypes.CHAR(10),
                allowNull: true,
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
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );
    return agency;
};
