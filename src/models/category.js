const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            category.belongsTo(models.brand, {
                foreignKey: 'brand_id',
                onDelete: 'RESTRICT',
            });
            category.hasMany(models.version, { foreignKey: 'category_id', onDelete: 'RESTRICT' });
            category.hasMany(models.warranty, { onDelete: 'RESTRICT' });
        }
    }
    category.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            brand_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'brand',
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
    return category;
};
