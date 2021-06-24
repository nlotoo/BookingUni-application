const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT, SECRET } = require('../config/config')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    bookedHotels: [{
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    }],
    offeredHotels: [{
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    }]
})

userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash
            next()
        })
})

module.exports = mongoose.model('User', userSchema);