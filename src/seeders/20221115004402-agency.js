/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const agencies = [
            {
                id: 1,
                name: 'OPTIMA AUTOMOTRIZ, S.A. DE C.V. (OPTIMA)',
                code: '10044',
                city_id: 1,
            },
            {
                id: 2,
                name: 'OPTIMA AUTOMOTRIZ, S.A. DE C.V. (OPTIMA)',
                code: '10063',
                city_id: 2,
            },
            {
                id: 3,
                name: 'OPTIMA AUTOMOTRIZ, S.A. DE C.V. (OPTIMA)',
                code: '10160',
                city_id: 3,
            },
        ];
        await queryInterface.bulkInsert('agency', agencies, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('agency', null, {});
    },
};
