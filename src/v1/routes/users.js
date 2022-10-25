const express = require('express');

const router = express.Router();
const workOutController = require('../../controllers/users');

router
    .get('/', workOutController.getAllUsers)
    .get('/:id', (req, res) => {
        res.send('Get one workouts');
    })
    .post('/', (req, res) => {
        res.send('Create a workout');
    });

module.exports = router;
