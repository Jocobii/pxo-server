const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const timezone = require('dayjs/plugin/timezone');

const initDayjs = () => {
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(timezone);
    dayjs.locale('es');
    dayjs.tz.setDefault('America/Los_Angeles');
};

module.exports = initDayjs;
