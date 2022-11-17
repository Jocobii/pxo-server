/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const car_dealers = [
            {
                id: 1,
                name: 'OPTIMA AUTOMOTRIZ, S.A. DE C.V. (OPTIMA)',
                code: '10044',
            },
        ];
        await queryInterface.bulkInsert('car_dealer', car_dealers, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('car_dealer', null, {});
    },
};
