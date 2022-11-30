const dayjs = require('dayjs');
const { Op } = require('sequelize');
const models = require('../../models/index');
const { standardResponse } = require('../utils/helpers');
const { applyGeneralFilters } = require('../utils/sequelize');

const couldBeGoldWarranty = (dateIssue, mileage) => {
    if (!dateIssue || !mileage) return null;
    const maxDate = dayjs().add(180, 'day').format('YYYY/MM/DD');
    const currentDate = dayjs(dateIssue).format('YYYY/MM/DD');

    return dayjs(currentDate).isSameOrBefore(maxDate) && mileage < 10000;
};

const read = async (req) => {
    try {
        const {
            page, sortField, sortOrder,
            dateIssue, mileage, categoryId,
        } = req.query;

        const { where, pagination, order } = applyGeneralFilters(req.query);

        const isGoldWarranty = couldBeGoldWarranty(dateIssue, mileage);

        if (!isGoldWarranty) where.name = { [Op.notLike]: '%PREMIUM' };
        if (categoryId) where.categoryId = Number(categoryId);

        const result = await models.warranty.findAndCountAll({
            attributes: { exclude: ['deleted_at', 'is_active'] },
            limit: pagination.limit,
            offset: pagination.offset,
            where,
            order,
        });
        const info = {
            total: result.count,
            results: pagination.limit,
            page: page ? parseInt(page, 10) : 1,
            sortField,
            sortOrder,
        };

        return standardResponse(
            false,
            200,
            'Productos encontrados',
            result.rows,
            info,
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

module.exports = read;
