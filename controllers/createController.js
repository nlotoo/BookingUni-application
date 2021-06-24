const { Router } = require('express')
const router = Router()


const authServices = require('../services/authServices')

router.get('/create', (req, res) => {
    res.render('create')
})
router.post('/create', (req, res, next) => {

    const { hotel, city, freeRooms, imgUrl } = req.body

    let ownerId = req.user._id

    let hotelObject = {
        hotel,
        city,
        freeRooms,
        imgUrl,
        ownerId,
    }
    authServices.create(hotelObject).then(result => {
        res.redirect('/')
    }).catch(error => {
        res.render('create', { error })
    })


})
router.get('/:id?/details', (req, res) => {

    authServices.getOne(req.params.id).then(data => {
        let userId = req.user._id
        itsOwner = data[0].ownerId == userId
        itsBooked = data[0].userBooked.find(x => x == userId)
        res.render('details', {
            data: data[0],
            itsOwner: itsOwner,
            itsBooked: itsBooked
        })
    })
})
router.get('/:id?/edit', (req, res) => {
    authServices.getOne(req.params.id).then(data => {
        res.render('edit', { data: data[0] })
    })
})
router.post('/:id?/edit', (req, res) => {

    const { hotel, city, freeRooms, imgUrl } = req.body


    let hotelObject = {
        hotel,
        city,
        freeRooms,
        imgUrl,
    }
    authServices.updateOneHotel(req.params.id, hotelObject).then(data => {
        console.log(data)
        res.redirect('/')
        return data
    })



})
router.get('/:id?/delete', (req, res) => {
    authServices.deleteOne(req.params.id).then(data => {
        res.redirect('/')
    })
})
router.get('/:id?/book', (req, res, next) => {
    let userId = req.user._id
    let id = req.params.id
    authServices.bookIn(id, userId).then(data => {
        res.redirect(`/`)
    }).catch(next)

})



module.exports = router