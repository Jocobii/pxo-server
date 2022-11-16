/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface) {
        const banks = [
            {
                id: 1,
                brand: 'AFIRME',
            },
            {
                id: 2,
                brand: 'BANAMEX',
            },
            {
                id: 3,
                brand: 'BANBAJIO',
            },
            {
                id: 4,
                brand: 'BANORTE',
            },
            {
                id: 5,
                brand: 'BANREGIO',
            },
            {
                id: 6,
                brand: 'BBVA',
            },
            {
                id: 7,
                brand: 'BNP',
            },
            {
                id: 8,
                brand: 'CETELEM',
            },
            {
                id: 9,
                brand: 'INBURSA',
            },
            {
                id: 10,
                brand: 'SANTANDER',
            },
            {
                id: 11,
                brand: 'SCOTIABANK',
            },
        ];
        await queryInterface.bulkInsert('bank', banks, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('bank', null, {});
    },
};
