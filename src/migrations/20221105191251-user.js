/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('User', 'code_recovery', {
            type: Sequelize.DataTypes.STRING(10),
            allowNull: true,
        });
    },

    async down(queryInterface) {
        queryInterface.removeColumn('User', 'code_recovery');
    },
};
