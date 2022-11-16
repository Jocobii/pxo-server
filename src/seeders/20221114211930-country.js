/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const countries = [
            { id: 1, key: 'MX', name: 'Mexico' },
        ];
        await queryInterface.bulkInsert('country', countries, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('country', null, {});
    },
};
