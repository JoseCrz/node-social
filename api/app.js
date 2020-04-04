const express = require('express')
const bodyParser = require('body-parser')

const userRouter = require('./components/user/network')
const config = require('../config/config')
const PORT = config.port

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
