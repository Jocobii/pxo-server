/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const brands = [
            {
                id: 1,
                first_name: 'Root',
                first_last_name: 'Root',
                email: 'root@gpoptima.com',
                // password: gpoptima123
                password: '$2b$10$BWfU34BaSQh06QGFHE7mOOcGwdlBYpVAzsh.MirbYIvOmkxnLu8X2',
                agency_id: 1,
            },
        ];
        await queryInterface.bulkInsert('user', brands, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user', null, {});
    },
};
