const userServices = require('../services/users/user');

const getAllUsers = async (_req, res) => {
    const users = await userServices.getAllUsers();
    res.json({ data: users });
};

const updateUser = async (req, res) => {
    const users = await userServices.updateUser(req);
    res.json(users);
};

module.exports = {
    getAllUsers,
    updateUser,
};
