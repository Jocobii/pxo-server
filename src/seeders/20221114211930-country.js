/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const countries = [
            {
                id: 1,
                key: 'MX',
                name: 'MEXICO (ESTADOS UNIDOS MEXICANOS)',
            },
            {
                id: 2,
                key: 'USA',
                name: 'ESTADOS UNIDOS DE AMERICA',
            },
            {
                id: 3,
                key: 'CA',
                name: 'CANADA',
            },
        ];
        await queryInterface.bulkInsert('country', countries, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('country', null, {});
    },
};
