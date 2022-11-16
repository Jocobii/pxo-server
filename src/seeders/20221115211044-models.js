/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const models = [
            {
                id: 1,
                name: 'UNIQ MT',
                sub_brand_id: 2,
            },
            {
                id: 2,
                name: 'SPORT CVT',
                sub_brand_id: 2,
            },
            {
                id: 3,
                name: 'PRIME CVT',
                sub_brand_id: 2,
            },
            {
                id: 4,
                name: 'TOURING CVT',
                sub_brand_id: 2,
            },
            {
                id: 5,
                name: 'I-STYLE',
                sub_brand_id: 3,
            },
            {
                id: 6,
                name: 'SPORT',
                sub_brand_id: 3,
            },
            {
                id: 7,
                name: 'TOURING',
                sub_brand_id: 3,
            },
            {
                id: 8,
                name: '2022',
                sub_brand_id: 13,
            },
            {
                id: 9,
                name: 'SPORT PLUS',
                sub_brand_id: 6,
            },
            {
                id: 10,
                name: 'UNIQ',
                sub_brand_id: 5,
            },
            {
                id: 11,
                name: 'UNIQ',
                sub_brand_id: 5,
            },
            {
                id: 12,
                name: 'PRIME',
                sub_brand_id: 5,
            },
            {
                id: 13,
                name: 'UNIQ CVT',
                sub_brand_id: 4,
            },
            {
                id: 14,
                name: 'SPORT',
                sub_brand_id: 4,
            },
            {
                id: 15,
                name: 'TOURING',
                sub_brand_id: 4,
            },
            {
                id: 16,
                name: 'TURBO',
                sub_brand_id: 14,
            },
            {
                id: 17,
                name: 'TURBO PLUS',
                sub_brand_id: 14,
            },
            {
                id: 18,
                name: 'TOURING',
                sub_brand_id: 14,
            },
            {
                id: 19,
                name: 'TOURING',
                sub_brand_id: 7,
            },
            {
                id: 20,
                name: 'TOURING',
                sub_brand_id: 11,
            },
        ];
        await queryInterface.bulkInsert('model', models, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('model', null, {});
    },
};
