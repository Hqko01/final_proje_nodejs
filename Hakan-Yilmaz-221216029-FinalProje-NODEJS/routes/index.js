const express = require('express');
const users = require('../models/users');

const router = express.Router();

router.get('/', (req, res) => {
    users.find()
        .then((result) => {
            res.render('home', { instructor: result })
        })
})

module.exports = router;