/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const models = [
            {
                id: 1,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 1,
            },
            {
                id: 2,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 2,
            },
            {
                id: 3,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 3,
            },
            {
                id: 4,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 4,
            },
            {
                id: 5,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 5,
            },
            {
                id: 6,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 6,
            },
            {
                id: 7,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 7,
            },
            {
                id: 8,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 8,
            },
            {
                id: 9,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 9,
            },
            {
                id: 10,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 10,
            },
            {
                id: 11,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 11,
            },
            {
                id: 12,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 12,
            },
            {
                id: 13,
                year: null,
                mileage: null,
                series: null,
                vin: null,
                sub_brand_id: 13,
            },
        ];
        await queryInterface.bulkInsert('car', models, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('car', null, {});
    },
};
