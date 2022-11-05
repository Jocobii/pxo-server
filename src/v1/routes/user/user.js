const express = require('express');

const router = express.Router();
const user = require('../../../controllers/user');

router
    .get('/', user.getAllUsers)
    .get('/:id', (req, res) => {
        res.send('Get one workouts');
    })
    .post('/', (req, res) => {
        res.send('Create a workout');
    });

module.exports = router;
