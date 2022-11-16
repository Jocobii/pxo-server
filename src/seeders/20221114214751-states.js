/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const states = [
            {
                id: 1,
                key: 'BC',
                name: 'BAJA CALIFORNIA',
                country_id: 1,
            },
        ];
        await queryInterface.bulkInsert('state', states, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('state', null, {});
    },
};
