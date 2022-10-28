const workoutServices = require('../services/users');

const getAllUsers = async (req, res) => {
    const users = await workoutServices.getAllUsers();
    res.json({ data: users });
};

module.exports = {
    getAllUsers,
};
