/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const brands = [
            {
                id: 1,
                name: 'Honda',
            },
        ];
        await queryInterface.bulkInsert('brand', brands, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('brand', null, {});
    },
};
