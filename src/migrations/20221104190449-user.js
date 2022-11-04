/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('User', 'access_token', {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        });
    },

    async down(queryInterface) {
        queryInterface.removeColumn('User', 'access_token');
    },
};
