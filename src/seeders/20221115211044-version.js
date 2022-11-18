/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const models = [
            {
                id: 1,
                name: 'UNIQ MT',
                category_id: 2,
            },
            {
                id: 2,
                name: 'SPORT CVT',
                category_id: 2,
            },
            {
                id: 3,
                name: 'PRIME CVT',
                category_id: 2,
            },
            {
                id: 4,
                name: 'TOURING CVT',
                category_id: 2,
            },
            {
                id: 5,
                name: 'I-STYLE',
                category_id: 3,
            },
            {
                id: 6,
                name: 'SPORT',
                category_id: 3,
            },
            {
                id: 7,
                name: 'TOURING',
                category_id: 3,
            },
            {
                id: 8,
                name: '2022',
                category_id: 13,
            },
            {
                id: 9,
                name: 'SPORT PLUS',
                category_id: 6,
            },
            {
                id: 21,
                name: 'TOURING',
                category_id: 6,
            },
            {
                id: 10,
                name: 'UNIQ',
                category_id: 5,
            },
            {
                id: 12,
                name: 'PRIME',
                category_id: 5,
            },
            {
                id: 13,
                name: 'UNIQ CVT',
                category_id: 4,
            },
            {
                id: 14,
                name: 'SPORT',
                category_id: 4,
            },
            {
                id: 15,
                name: 'TOURING',
                category_id: 4,
            },
            {
                id: 16,
                name: 'TURBO',
                category_id: 14,
            },
            {
                id: 17,
                name: 'TURBO PLUS',
                category_id: 14,
            },
            {
                id: 18,
                name: 'TOURING',
                category_id: 14,
            },
            {
                id: 19,
                name: 'TOURING',
                category_id: 7,
            },
            {
                id: 20,
                name: 'TOURING',
                category_id: 11,
            },
        ];
        await queryInterface.bulkInsert('version', models, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('version', null, {});
    },
};
