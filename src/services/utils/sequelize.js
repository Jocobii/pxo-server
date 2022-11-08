const getLimitAndOffset = (resultsLimit, page) => {
    const limit = parseInt(resultsLimit, 10) || 10;
    const offset = (parseInt(page, 10) - 1) * limit || 0;
    return {
        limit,
        offset,
    };
};

module.exports = {
    getLimitAndOffset,
};
