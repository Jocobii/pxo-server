/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const categories = [
            {
                id: 1,
                name: 'CITY',
                brand_id: 1,
            },
            {
                id: 2,
                name: 'CIVIC',
                brand_id: 1,
            },
            {
                id: 3,
                name: 'ACCORD',
                brand_id: 1,
            },
            {
                id: 4,
                name: 'INSIGHT',
                brand_id: 1,
            },
            {
                id: 5,
                name: 'BR-V',
                brand_id: 1,
            },
            {
                id: 6,
                name: 'CR-V',
                brand_id: 1,
            },
            {
                id: 7,
                name: 'PILOT',
                brand_id: 1,
            },
            {
                id: 8,
                name: 'ODYSSEY',
                brand_id: 1,
            },
            {
                id: 9,
                name: 'HR-V',
                brand_id: 1,
            },
        ];
        await queryInterface.bulkInsert('category', categories, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('category', null, {});
    },
};
