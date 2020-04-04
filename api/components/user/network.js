const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', (req, res) => { // ? list all users
    controller.list()
    .then(list => {
        response.success(req, res, list)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, error)
    })
})

router.get('/:id', (req, res) => { // ? get one user
    userId = parseInt(req.params.id)
    
    controller.get(userId)
    .then(user  => {
        response.success(req, res, user)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, error)
    })
})

module.exports = router