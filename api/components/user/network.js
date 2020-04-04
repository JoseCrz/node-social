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

router.post('/', (req, res) => {
    console.log(req.body)
    newUser = req.body
    controller.upsert(newUser)
    .then(createdUser => {
        response.success(req, res, createdUser, 201)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, 'Internal Server Error')
    })
})

module.exports = router