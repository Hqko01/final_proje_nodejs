const jwt = require('jsonwebtoken')
const storage = require('node-sessionstorage')
const users = require('../../models/users')

module.exports = (req, res, next) => {
    try {
        const token = storage.getItem('token')
        const decodedToken = jwt.verify(token, 'secretKey')

        users.findOne({ name: decodedToken.name, password: decodedToken.password, mail: decodedToken.mail, gender: decodedToken.gender, educationType: decodedToken.educationType })
            .then((result) => {
                if (result == null) {
                    res.redirect('/auth/login?404')
                    console.log('Girilen değerler bulunamadı..')
                }
                else {
                    res.redirect('/profile/user')
                    console.log('Doğrulama işlemi tamamlandı')
                }
            })
            .catch((err) => {
                res.redirect('/')
                console.log(err)
            })
        next();
    } catch (error) {
        res.redirect('/')
        console.log('Yetkisiz Erişim')
    }
}