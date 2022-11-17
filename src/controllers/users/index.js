const userServices = require('../../services/users');

const getAllUsers = async (req, res) => {
    const users = await userServices.getAllUsers(req);
    res.status(users.httpCode).json(users);
};

const updateUser = async (req, res) => {
    const users = await userServices.updateUser(req);
    res.status(users.httpCode).json(users);
};

const deleteUser = async (req, res) => {
    const users = await userServices.deleteUser(req);
    res.status(users.httpCode).json(users);
};

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
};
