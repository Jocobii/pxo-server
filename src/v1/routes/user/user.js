const express = require('express');

const router = express.Router();
const user = require('../../../controllers/users');
const { userUpdateSchema } = require('./middleware/user.schemas');

router
    .get('/list', user.getAllUsers)
    .get('/:id', (req, res) => {
        res.send('Get one workouts xddd');
    })
    .put('/', userUpdateSchema, user.updateUser)
    .delete('/:id', user.deleteUser);

module.exports = router;
