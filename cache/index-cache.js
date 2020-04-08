const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config/config')

const routes = require('./network')

const PORT = config.cacheService.port
const app = express()

app.use(bodyParser.json())

app.use(routes)

app.listen(PORT, () => {
    console.log(`[CACHE SERVICE] listening on port ${PORT}`)
})