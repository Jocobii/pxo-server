/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const policies_types = [{ id: 1, name: 'Financiada' }, { id: 2, name: 'Contado' }];
        await queryInterface.bulkInsert('policy_type', policies_types, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('policy_type', null, {});
    },
};
