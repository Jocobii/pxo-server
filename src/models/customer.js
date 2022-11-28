const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(model) {
            customer.hasMany(model.customer_address, {
                foreignKey: 'customer_id',
                onDelete: 'RESTRICT',
                sourceKey: 'id',
            });
        }
    }
    customer.init(
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
            middle_name: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            cellPhone: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            first_last_name: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            second_last_name: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.name} ${this.middle_name || ''} ${this.first_last_name || ''} ${this.second_last_name || ''}`;
                },
            },
            rfc: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            is_company: {
                type: DataTypes.TINYINT(1),
                allowNull: false,
                defaultValue: false,
            },
            date_incorporation_company: {
                allowNull: true,
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
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            sequelize,
        },
    );
    return customer;
};
