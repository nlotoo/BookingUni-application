const { Router } = require('express')
const router = Router()
const { COOKIE_NAME } = require('../config/config')
const authServices = require('../services/authServices')

router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req, res, next) => {



    const { email, username, password, rePassword } = req.body

    if (password != rePassword) {
        throw new Error('Password missmatch')
    }

    let user = {
        email,
        username,
        password,
    }

    authServices.register(user).then(token => {
        res.cookie(COOKIE_NAME, token)
        res.redirect('/')
    }).catch(next)


})
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    console.log({ username, password })
    authServices.login({ username, password })
        .then(token => {
            res.cookie(COOKIE_NAME, token)
            res.redirect('/')
        }).catch(error => {
            res.render('login', { error })
        })
})

router.get('/profile', (req, res) => {

    authServices.getProfile(req.user._id).then(data => {
        let bookedhotel = data.bookedHotels
        let result = []
        let bookedData = () => bookedhotel.map(x => x.hotel)
        result = bookedData()
        res.render('profile', {
            data: data,
            result: result.join(', ')
        })
    })
})





module.exports = router