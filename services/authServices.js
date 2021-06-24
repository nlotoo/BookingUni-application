const User = require('../models/User')
const Hotel = require('../models/Hotel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = require('../config/config')

const register = (user) => {
    return User.create(user).then(data => {
        let token = jwt.sign({ _id: data._id, username: data.username, email: data.email }, SECRET)
        return token
    })

}
const login = ({ username, password }) => {

    let user = User.findOne({ username: username }).then(user => {
        if (!user) {
            throw new Error('Invalid username and pass')
        }
        return bcrypt.compare(password, user.password).then(areEqual => {
            console.log(areEqual)
            if (!areEqual) {
                throw new Error('wrong pass')
            }
            let token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, SECRET)
            return token
        })

    })
    return user
}
const create = (hotelObject) => {

    return Hotel.create(hotelObject)

}
const getAll = () => {
    return Hotel.find({}).sort({ freeRooms: -1 }).lean()
}
const getOne = (id) => {
    return Hotel.find({ _id: id }).lean()
}
const updateOneHotel = (id, data) => {
    return Hotel.updateOne({ _id: id }, data)
}
const deleteOne = (id) => {
    return Hotel.deleteOne({ _id: id })
}
const bookIn = (id, userid) => {


    return Hotel.findOne({ _id: id }).populate('userBooked').then(data => {
        data.userBooked.push(userid)
        User.findOne({ _id: userid }).then(result => {
            result.bookedHotels.push(id)
            return result.save()
        })
        return data.save()
    })



}

const getProfile = (id) => {
    return User.findOne({ _id: id }).populate('bookedHotels').lean()
}


module.exports = {
    register,
    login,
    create,
    getAll,
    getOne,
    updateOneHotel,
    deleteOne,
    bookIn,
    getProfile,

}