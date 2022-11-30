/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface) {
        const banks = [
            {
                id: 1,
                name: 'AFIRME',
            },
            {
                id: 2,
                name: 'BANAMEX',
            },
            {
                id: 3,
                name: 'BANBAJIO',
            },
            {
                id: 4,
                name: 'BANORTE',
            },
            {
                id: 5,
                name: 'BANREGIO',
            },
            {
                id: 6,
                name: 'BBVA',
            },
            {
                id: 7,
                name: 'BNP',
            },
            {
                id: 8,
                name: 'CETELEM',
            },
            {
                id: 9,
                name: 'INBURSA',
            },
            {
                id: 10,
                name: 'SANTANDER',
            },
            {
                id: 11,
                name: 'SCOTIABANK',
            },
        ];
        await queryInterface.bulkInsert('bank', banks, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('bank', null, {});
    },
};
