const { Op } = require('sequelize');
const models = require('../../models/index');

const getLimitAndOffset = (resultsLimit, page) => {
    const limit = parseInt(resultsLimit, 10) || 10;
    const offset = (parseInt(page, 10) - 1) * limit || 0;
    return {
        limit,
        offset,
    };
};

const getOrderBySort = (model, sortField, sortOrder) => {
    let order = [['id', 'DESC']];
    if (sortField && sortOrder && sortField !== 'undefined') {
        if (sortField.includes('.')) {
            const arr = sortField.split('.');
            order = [
                [
                    model[arr[0]] ? model[arr[0]] : arr[0],
                    model[arr[1]] ? model[arr[1]] : arr[1],
                    arr[2],
                    sortOrder === 'asc' ? 'ASC' : 'DESC',
                ].filter((e) => e),
            ];
        } else {
            order = [[sortField, sortOrder === 'asc' ? 'ASC' : 'DESC']];
        }
    }
    return order;
};

const applyGeneralFilters = (query) => {
    const {
        results, page, sortField, sortOrder,
        searchLike, fieldLike,
    } = query;

    const order = getOrderBySort(models, sortField, sortOrder);
    const { limit, offset } = getLimitAndOffset(results, page);
    const where = { is_active: true };

    if (fieldLike && searchLike) {
        where[fieldLike] = { [Op.like]: `%${searchLike}%` };
    }

    return {
        where,
        pagination: { limit, offset },
        order,
    };
};
module.exports = {
    getLimitAndOffset,
    getOrderBySort,
    applyGeneralFilters,
};
