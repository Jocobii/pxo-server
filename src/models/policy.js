const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class policy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate() {}
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
