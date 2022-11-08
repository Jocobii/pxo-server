const userServices = require('../services/users/user');

const getAllUsers = async (_req, res) => {
    const users = await userServices.getAllUsers();
    res.status(users.httpCode).json({ data: users });
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
