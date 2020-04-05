const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const userRouter = require('./components/user/network')
const authRouter = require('./components/auth/network')
const config = require('../config/config')
const PORT = config.port

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

const swaggerDoc = require('./swagger.json')

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
