/** @type {import('sequelize-cli').Migration} */
const {
    CITY, CIVIC, ACCORD, INSIGHT, BR_V, CR_V, PILOT, ODYSSEY, HR_V,
} = require('../utils/categories');

module.exports = {
    async up(queryInterface) {
        const models = [
            {
                id: 1,
                name: 'UNIQ MT',
                category_id: CITY,
            },
            {
                id: 2,
                name: 'SPORT',
                category_id: CITY,
            },
            {
                id: 3,
                name: 'PRIME',
                category_id: CITY,
            },
            {
                id: 4,
                name: 'TOURING',
                category_id: CITY,
            },
            {
                id: 5,
                name: 'I-STYLE',
                category_id: CIVIC,
            },
            {
                id: 6,
                name: 'SPORT',
                category_id: CIVIC,
            },
            {
                id: 7,
                name: 'TOURING',
                category_id: CIVIC,
            },
            {
                id: 8,
                name: 'TOURING',
                category_id: ACCORD,
            },
            {
                id: 9,
                name: 'HIBRIDO L4',
                category_id: INSIGHT,
            },
            {
                id: 10,
                name: 'UNIQ',
                category_id: BR_V,
            },
            {
                id: 11,
                name: 'PRIME',
                category_id: BR_V,
            },
            {
                id: 12,
                name: 'TURBO',
                category_id: CR_V,
            },
            {
                id: 13,
                name: 'TURBO PLUS',
                category_id: CR_V,
            },
            {
                id: 14,
                name: 'TOURING',
                category_id: CR_V,
            },
            {
                id: 15,
                name: 'TOURING',
                category_id: PILOT,
            },
            {
                id: 16,
                name: 'TOURING',
                category_id: ODYSSEY,
            },
            {
                id: 17,
                name: 'BLACK EDITION',
                category_id: ODYSSEY,
            },
            {
                id: 18,
                name: 'UNIQ',
                category_id: HR_V,
            },
            {
                id: 19,
                name: 'SPORT',
                category_id: HR_V,
            },
            {
                id: 20,
                name: 'TOURING',
                category_id: HR_V,
            },
        ];
        await queryInterface.bulkInsert('version', models, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('version', null, {});
    },
};
