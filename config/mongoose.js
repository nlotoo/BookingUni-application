const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BOOKING_UNI',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB is conected...')
})



module.exports = db