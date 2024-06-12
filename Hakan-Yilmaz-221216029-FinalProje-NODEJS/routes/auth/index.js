const express = require('express');
const router = express.Router();
const users = require('../../models/users')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const checkJwt = require('./checkJWT')
const storage = require('node-sessionstorage')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signin', (req, res) => {
    res.render('signin')
})

router.post('/login', (req, res) => {
    const { name, password, mail, gender, educationType } = req.body
    const token = jwt.sign({
        name: name,
        password: password,
        mail: mail,
        gender: gender,
        educationType: educationType,
        exp: Math.floor(Date.now() / 1000) + 6000
    }, 'secretKey')

    storage.setItem('token', token)
    res.redirect(`/auth/login/success`)
})

router.get('/login/success', checkJwt, (req, res, next) => {
    console.log("Doğrulama işlemi başladı..")
})

router.post('/signin', (req, res) => {
    const { name, password, mail, gender, educationType } = req.body
    const token = jwt.sign({
        name: name,
        password: password,
        mail: mail,
        gender: gender,
        educationType: educationType,
        exp: Math.floor(Date.now() / 1000) + 6000
    }, 'secretKey')

    storage.setItem('token', token)
    users.findOne({ mail: mail })
        .then((result) => {
            if (result == null) {

                const usersSchema = new users({
                    name: name,
                    password: password,
                    mail: mail,
                    gender: gender,
                    educationType: educationType
                })

                usersSchema.save()
                    .then((result) => {
                        res.redirect(`/profile/user`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else {
                console.log('Bu mail kullanılamaz..')
                res.redirect('/auth/signin?mailDenied')
            }
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/')
        })
})

router.get('/sign/success', checkJwt, (req, res, next) => {
    console.log("Doğrulama işlemi başladı..")
})

module.exports = router;