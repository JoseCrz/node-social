const express = require('express')
const bodyParser = require('body-parser')

const PORT = require('../config/config').sqlService.port

const routes = require('./network')

const app = express()

app.use(bodyParser.json())

app.use('/', routes)
app.listen(PORT, () => {
    console.log(`[SQL SERVICE] listening on port ${PORT}`)
})
