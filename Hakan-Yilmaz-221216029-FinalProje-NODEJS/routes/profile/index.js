const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const storage = require('node-sessionstorage');
const users = require('../../models/users');
router.use(express.json({ limit: '50mb' }));

router.get('/user', (req, res) => {
    var token = storage.getItem('token')
    var decodedToken = jwt.verify(token, 'secretKey')
    storage.setItem('decoded', decodedToken)

    users.findOne({ mail: decodedToken.mail })
        .then((result) => {
            res.render('profile', { "profile": result })
        })
})

router.post('/user/:func', (req, res) => {
    var token = storage.getItem('token')
    var decodedToken = jwt.verify(token, 'secretKey')

    var func = req.params.func
    if (func == "update") {
        users.findOneAndUpdate({ mail: decodedToken.mail }, { $set: { name: req.body.name, passowrd: req.body.password, mail: req.body.mail, gender: req.body.gender, job: req.body.job, avatar: req.body.avatar } }, { new: true })
            .then(data => console.log(data))
            .finally(() => {
                const token = jwt.sign({
                    name: req.body.name,
                    password: req.body.password,
                    mail: req.body.mail,
                    gender: req.body.gender,
                    educationType: storage.getItem('decoded').educationType,
                    job: req.body.job,
                    avatar: req.body.avatar,
                    exp: Math.floor(Date.now() / 1000) + 6000
                }, 'secretKey')

                storage.setItem('token', token)
                res.json({ success: true })
            })
    }
    else if (func == 'delete') {
        users.findOneAndDelete({ mail: storage.getItem('decoded').mail })
            .then((result) => {
                res.json({ success: true })
            })
    }
})

module.exports = router;