/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const models = [
            {
                id: 1,
                name: 'FIT',
                brand_id: 1,
            },
            {
                id: 2,
                name: 'CITY',
                brand_id: 1,
            },
            {
                id: 3,
                name: 'CIVIC',
                brand_id: 1,
            },
            {
                id: 4,
                name: 'HRV',
                brand_id: 1,
            },
            {
                id: 5,
                name: 'BRV',
                brand_id: 1,
            },
            {
                id: 6,
                name: 'ACCORD',
                brand_id: 1,
            },
            {
                id: 7,
                name: 'PILOT',
                brand_id: 1,
            },
            {
                id: 8,
                name: 'HYBRIDO',
                brand_id: 1,
            },
            {
                id: 9,
                name: 'Si',
                brand_id: 1,
            },
            {
                id: 10,
                name: 'CRZ',
                brand_id: 1,
            },
            {
                id: 11,
                name: 'ODYSSEY',
                brand_id: 1,
            },
            {
                id: 12,
                name: 'TYPE R',
                brand_id: 1,
            },
            {
                id: 13,
                name: 'INSIGHT',
                brand_id: 1,
            },
            {
                id: 14,
                name: 'CRV',
                brand_id: 1,
            },
        ];
        await queryInterface.bulkInsert('category', models, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('category', null, {});
    },
};
