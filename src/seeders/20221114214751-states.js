/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const states = [
            {
                id: 2,
                key: 'AG',
                name: 'BAJA AGUASCALIENTES',
                country_id: 1,
            },
            {
                id: 1,
                key: 'BC',
                name: 'BAJA CALIFORNIA NORTE',
                country_id: 1,
            },
            {
                id: 3,
                key: 'BS',
                name: 'BAJA CALIFORNIA SUR',
                country_id: 1,
            },
            {
                id: 4,
                key: 'CM',
                name: 'CAMPECHE',
                country_id: 1,
            },
            {
                id: 5,
                key: 'CS',
                name: 'CHIAPAS',
                country_id: 1,
            },
            {
                id: 6,
                key: 'CH',
                name: 'CHIHUAHUA',
                country_id: 1,
            },
            {
                id: 7,
                key: 'CO',
                name: 'COAHUILA',
                country_id: 1,
            },
            {
                id: 8,
                key: 'CL',
                name: 'COLIMA',
                country_id: 1,
            },
            {
                id: 9,
                key: 'CDMX',
                name: 'CIUDAD DE MEXICO',
                country_id: 1,
            },
            {
                id: 10,
                key: 'GR',
                name: 'GUERRERO',
                country_id: 1,
            },
            {
                id: 11,
                key: 'GT',
                name: 'GUANAJUATO',
                country_id: 1,
            },
            {
                id: 12,
                key: 'GH',
                name: 'HIDALGO',
                country_id: 1,
            },
            {
                id: 13,
                key: 'GJ',
                name: 'JALISCO',
                country_id: 1,
            },
            {
                id: 14,
                key: 'EM',
                name: 'EDO DE MEXICO',
                country_id: 1,
            },
            {
                id: 15,
                key: 'MI',
                name: 'MICHOACAN',
                country_id: 1,
            },
            {
                id: 16,
                key: 'MO',
                name: 'MORELOS',
                country_id: 1,
            },
            {
                id: 17,
                key: 'NA',
                name: 'NAYARIT',
                country_id: 1,
            },
            {
                id: 18,
                key: 'NL',
                name: 'NUEVO LEON',
                country_id: 1,
            },
            {
                id: 19,
                key: 'OA',
                name: 'OAXACA',
                country_id: 1,
            },
            {
                id: 20,
                key: 'PU',
                name: 'PUEBLA',
                country_id: 1,
            },
            {
                id: 21,
                key: 'QT',
                name: 'QUERETARO',
                country_id: 1,
            },
            {
                id: 22,
                key: 'QR',
                name: 'QUINTANA ROO',
                country_id: 1,
            },
            {
                id: 23,
                key: 'SL',
                name: 'SAN LUIS POTOSI',
                country_id: 1,
            },
            {
                id: 24,
                key: 'SI',
                name: 'SINALOA',
                country_id: 1,
            },
            {
                id: 25,
                key: 'SO',
                name: 'SONORA',
                country_id: 1,
            },
            {
                id: 26,
                key: 'TB',
                name: 'TABASCO',
                country_id: 1,
            },
            {
                id: 27,
                key: 'TM',
                name: 'TAMAULPAS',
                country_id: 1,
            },
            {
                id: 28,
                key: 'TL',
                name: 'TLAXCALA',
                country_id: 1,
            },
            {
                id: 29,
                key: 'VE',
                name: 'VERACRUZ',
                country_id: 1,
            },
            {
                id: 30,
                key: 'YU',
                name: 'YUCATAN',
                country_id: 1,
            },
            {
                id: 31,
                key: 'ZA',
                name: 'ZACATECAS',
                country_id: 1,
            },
        ];
        await queryInterface.bulkInsert('state', states, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('state', null, {});
    },
};
