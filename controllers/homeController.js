const { Router } = require('express')
const { COOKIE_NAME } = require('../config/config')
const router = Router()

const authServices = require('../services/authServices')

router.get('/', (req, res) => {
    authServices.getAll().then(data => {
        res.render('home', {
            data: data,
        })
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.redirect('/')
})





module.exports = router