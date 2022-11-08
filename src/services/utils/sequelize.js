const getLimitAndOffset = (resultsLimit, page) => {
    const limit = parseInt(resultsLimit, 10) || 10;
    const offset = (parseInt(page, 10) - 1) * limit || 0;
    return {
        limit,
        offset,
    };
};

const getOrderBySort = (models, sortField, sortOrder) => {
    let order = [['id', 'DESC']];
    if (sortField && sortOrder && sortField !== 'undefined') {
        if (sortField.includes('.')) {
            const arr = sortField.split('.');
            order = [
                [
                    models[arr[0]] ? models[arr[0]] : arr[0],
                    models[arr[1]] ? models[arr[1]] : arr[1],
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

module.exports = {
    getLimitAndOffset,
    getOrderBySort,
};
