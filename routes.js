const { Router } = require('express');
const router = Router()

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController');
const createController = require('./controllers/createController')

const auth = require('./middleware/auth')



router.use('/', auth, homeController)
router.use('/auth', auth, authController)
// router.use('auth/:id?/details',auth, authController)

router.use('/create', auth, createController)




module.exports = router