require('dotenv').config();
const puppeteer = require('puppeteer');
const hbs = require('handlebars');
const path = require('path');
const fs = require('fs-extra');
const models = require('../../../models/index');
const { standardResponse } = require('../../utils/helpers');
const { applyGeneralFilters } = require('../../utils/sequelize');
const { plainObject } = require('../../../utils/helpers');

const queryForGetPolicy = async (where) => models.policy.findOne({
    attributes: { exclude: ['deleted_at', 'is_active'] },
    where,
    include: [
        {
            model: models.policy_detail,
            attributes: { exclude: ['deleted_at', 'is_active', 'customer_id', 'car_id'] },
            include: [
                {
                    model: models.customer,
                    attributes: { exclude: ['deleted_at', 'is_active'] },
                    include: [
                        { model: models.customer_address, attributes: { exclude: ['deleted_at', 'is_active', 'customer_id'] } },
                    ],
                },
                {
                    model: models.car,
                    attributes: { exclude: ['category_id', 'version_id', 'customer_id', 'deleted_at', 'is_active'] },
                    include: [
                        { model: models.category, attributes: ['name'] },
                        { model: models.version, attributes: ['name'] },
                    ],
                },
            ],
        },
    ],
});

const createContract = async (req) => {
    try {
        const { id } = req.query;
        if (!id) return standardResponse(true, 400, 'No se ha enviado el id de la póliza');
        const { where } = applyGeneralFilters(req.query);
        where.id = id;

        const result = await queryForGetPolicy(where);

        if (!result) return standardResponse(true, 404, 'No se encontró la póliza');

        const html = await fs.readFile(path.join(__dirname, '../../../views/policy/contract.handlebars'), 'utf8');
        const template = await hbs.compile(html)(plainObject(result));
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(template);
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
        await browser.close();
        return standardResponse(
            false,
            200,
            'PDF GENERADO',
            pdf,
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

module.exports = {
    createContract,
    queryForGetPolicy,
};
