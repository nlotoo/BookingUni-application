const hbs = require('express-handlebars');
const express = require('express')
const cookieParser = require('cookie-parser')



module.exports = (app) => {

    app.engine('hbs', hbs({
        defaultLayout: 'main',
        extname: '.hbs'

    }));
    

    app.set('view engine', 'hbs');
    app.use('/static', express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

}