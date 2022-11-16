/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const cities = [
            {
                id: 1,
                name: 'Tijuana',
                state_id: 1,
            },
            {
                id: 2,
                name: 'Mexicali',
                state_id: 1,
            },
            {
                id: 3,
                name: 'Ensenada',
                state_id: 1,
            },
        ];
        await queryInterface.bulkInsert('city', cities, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('city', null, {});
    },
};
