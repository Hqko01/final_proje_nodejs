const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    educationType: {
        type: String,
        require: true
    },
    avatar: {
        typr: String,
    }

}, { Timestamp: true })

const users = mongoose.model('users', usersSchema)

module.exports = users