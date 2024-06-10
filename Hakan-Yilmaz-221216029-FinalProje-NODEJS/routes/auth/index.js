const express = require('express');
const router = express.Router();
const users = require('../../models/users')

router.get('/',(req, res) => {
    res.send('Education Tree AUTH')
})

/* router.get('/add', (req, res) => {
    const usersSchema = new users({
        name: "iclal",
        password: "121212",
        mail: "mail@com",
        gender: "bayan",
        userType: "öğrenci"
    })

    usersSchema.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})


router.get('/single', (req, res) => {
    users.findOne({ name: "iclal" })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
 */

module.exports = router;