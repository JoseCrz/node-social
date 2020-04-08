const express = require('express')
const bodyParser = require('body-parser')

const postRouter = require('./components/post/network')
const config = require('../config/config')
const errors = require('../network/errors')

const PORT = config.postService.port

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.use('/api/post', postRouter)
app.use(errors) // ! this has to be the last middleware to set

app.listen(PORT, () => {
    console.log(`[POST SERVICE] Listening on port: ${PORT}`)
})
