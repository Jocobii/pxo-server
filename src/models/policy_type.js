const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class policy_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate() {}
    }
    policy_type.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false,
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
    return policy_type;
};
