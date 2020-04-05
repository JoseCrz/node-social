const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.post('/login', (req, res) => {
    controller.login(req.body.username, req.body.password)
    .then(token => {
        response.success(req, res, token, 200)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, 'Invalid data', 400)
    })
})

module.exports = router