const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', (req, res) => {
    controller.list()
    .then(list => {
        response.success(req, res, list)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, error)
    })
})

module.exports = router