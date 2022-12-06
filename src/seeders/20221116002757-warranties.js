const {
    CITY, CIVIC, ACCORD, INSIGHT, BR_V, CR_V, PILOT, ODYSSEY, HR_V,
} = require('../utils/categories');

const warrantiesPerYear = [
    {
        id: 1,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 7650,
        categoryId: CITY,
    },
    {
        id: 2,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 8050,
        categoryId: CIVIC,
    },
    {
        id: 3,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 9400,
        categoryId: ACCORD,
    },
    {
        id: 4,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 11100,
        categoryId: INSIGHT,
    },
    {
        id: 5,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 8050,
        categoryId: BR_V,
    },
    {
        id: 6,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 9400,
        categoryId: CR_V,
    },
    {
        id: 7,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 9400,
        categoryId: PILOT,
    },
    {
        id: 8,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 11100,
        categoryId: ODYSSEY,
    },
    {
        id: 9,
        name: 'ELITE',
        months: '12',
        distance: 20_000,
        price: 8050,
        categoryId: HR_V,
    },
];
const warrantiesPerTwoYers = [
    {
        id: 10,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 10750,
        categoryId: CITY,
    },
    {
        id: 11,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 11250,
        categoryId: CIVIC,
    },
    {
        id: 12,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 13150,
        categoryId: ACCORD,
    },
    {
        id: 13,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 15500,
        categoryId: INSIGHT,
    },
    {
        id: 14,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 11250,
        categoryId: BR_V,
    },
    {
        id: 15,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 13150,
        categoryId: CR_V,
    },
    {
        id: 16,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 13150,
        categoryId: PILOT,
    },
    {
        id: 17,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 15500,
        categoryId: ODYSSEY,
    },
    {
        id: 18,
        name: 'ELITE',
        months: '24',
        distance: 40_000,
        price: 11250,
        categoryId: HR_V,
    },
];

const warrantiesPerThreeYers = [
    {
        id: 20,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 14800,
        categoryId: CITY,
    },
    {
        id: 22,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 14800,
        categoryId: CIVIC,
    },
    {
        id: 24,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 7650.0,
        categoryId: ACCORD,
    },
    {
        id: 26,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 7650.0,
        categoryId: INSIGHT,
    },
    {
        id: 28,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 7650.0,
        categoryId: BR_V,
    },
    {
        id: 30,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 7650.0,
        categoryId: CR_V,
    },
    {
        id: 32,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 7650.0,
        categoryId: PILOT,
    },
    {
        id: 34,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 7650.0,
        categoryId: ODYSSEY,
    },
    {
        id: 36,
        name: 'PREMIUM',
        months: '36',
        distance: 65_000,
        price: 7650.0,
        categoryId: HR_V,
    },
];

// 1 anio - 20km
// 2 anio - 40km
// 3 anio - 65km

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'warranty',
            [...warrantiesPerYear, ...warrantiesPerTwoYers, ...warrantiesPerThreeYers],
            {},
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('warranty', null, {});
    },
};
