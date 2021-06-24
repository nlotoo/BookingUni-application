const express = require('express')
const app = express()
const routers = require('./routes')
const { PORT } = require('./config/config')


// const auth = require('./middleware/auth')
const errorHandler = require('./middleware/middlewareError')

require('./config/mongoose')
require('./config/express')(app)


app.use(routers)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})