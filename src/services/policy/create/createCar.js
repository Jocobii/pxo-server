const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');
const { plainObject } = require('../../../utils/helpers');

const createCar = async (car, customerId, t) => {
    // TODO: Create and validate with own schema (car schema)
    const carObject = {
        ...car,
        customer_id: customerId,
    };

    const carExists = await models.car.findOne({ where: { vin: carObject.vin } });

    if (carExists) {
        return standardResponse(
            true,
            422,
            'Ya hay un vehiculo con ese VIN',
        );
    }
    const newCar = plainObject(await models.car.create(carObject, { transaction: t }));
    return newCar;
};

module.exports = createCar;
