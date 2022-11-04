module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            middle_name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            first_last_name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            second_last_name: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            isActive: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    },
};
