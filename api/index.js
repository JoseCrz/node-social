const express = require('express')

const config = require('../config/config')
const PORT = config.port

const app = express()


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
