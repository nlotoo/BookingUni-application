const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({

    hotel: {
        type: String,
        unique: true,
        required: true,
        minlength: 4,
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        
    },
    imgUrl: {
        type: String,
        required: true,
        
    },
    freeRooms: {
        type:String,
    },
    ownerId: {
        type: String
    },
    userBooked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

})


module.exports = mongoose.model('Hotel', hotelSchema);