const { Op } = require('sequelize');
const models = require('../../../models');
const { standardResponse } = require('../../utils/helpers');

const updateCar = async (car, customerId, t) => {
    // TODO: update and validate with own schema (car schema)
    const carObject = {
        ...car,
        customer_id: customerId,
    };

    const carExists = await models.car.findOne({
        where: {
            vin: carObject.vin,
            id: { [Op.ne]: car.id },
        },
    });
    if (carExists) {
        return standardResponse(true, 422, 'Ya hay un vehiculo con ese VIN');
    }

    await models.car.update(carObject, {
        where: { id: carObject.id },
        transaction: t,
    });
    return standardResponse(false, 200, 'Actualizado correctamente');
};

module.exports = updateCar;
