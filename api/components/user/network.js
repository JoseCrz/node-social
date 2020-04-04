const express = require('express')

const response = require('../../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', (req, res) => {
    const list = controller.list()
    response.success(req, res, list)
})

module.exports = router