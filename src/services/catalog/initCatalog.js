const models = require('../../models');
const { standardResponse } = require('../utils/helpers');

const getAllCategories = async () => {
    try {
        // El nombre de los arrays deben ser iguales a los del reducer de catalog del front end

        const catalogs = {
            agencies: [],
            banks: [],
            countries: [],
            carCategories: [],
            policyTypes: [],
        };
        const where = { is_active: true };

        const agencies = await models.agency.findAll({
            where,
            raw: true,
            attributes: ['id', 'name', 'code'],
        }).then((data) => {
            catalogs.agencies = data;
        });

        const countries = models.country.findAll({
            where,
            raw: true,
            attributes: ['id', 'key', 'name'],
        }).then((data) => {
            catalogs.countries = data;
        });

        const banks = models.bank.findAll({
            where,
            raw: true,
            attributes: ['id', 'name'],
        }).then((data) => {
            catalogs.banks = data;
        });

        const categories = models.category.findAll({
            where,
            attributes: ['id', 'name'],
            include: [{ model: models.version, attributes: ['id', 'name'] }],
        }).then((data) => {
            catalogs.carCategories = data;
        });

        const policiesTypes = models.policy_type.findAll({
            where,
            raw: true,
            attributes: ['id', 'name'],
        }).then((data) => {
            catalogs.policyTypes = data;
        });

        await Promise.all([banks, countries, categories, policiesTypes, agencies]);
        return standardResponse(
            false,
            200,
            'Catalogos cargados correctamente',
            catalogs,
        );
    } catch (error) {
        console.log(error);
        return standardResponse(
            true,
            500,
            'Ha ocurrido un error en el servdor',
        );
    }
};

module.exports = getAllCategories;
