/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const agencies = [
            {
                id: 1,
                name: 'Honda Tijuana',
                city_id: 1,
            },
            {
                id: 2,
                name: 'Honda Mexicali',
                city_id: 2,
            },
            {
                id: 3,
                name: 'Honda Ensenada',
                city_id: 3,
            },
        ];
        await queryInterface.bulkInsert('agency', agencies, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('agency', null, {});
    },
};
