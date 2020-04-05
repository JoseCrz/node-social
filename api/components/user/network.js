const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

const listUsers = (req, res) => { // ? list all users
    controller.list()
    .then(list => {
        response.success(req, res, list)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, error)
    })
}

const getUser = (req, res) => { // ? get one user
    userId = parseInt(req.params.id)
    
    controller.get(userId)
    .then(user  => {
        response.success(req, res, user)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, error)
    })
}

const upsertUser = (req, res) => { // ? add one user
    console.log(req.body)
    controller.upsert(req.body)
    .then(createdUser => {
        response.success(req, res, createdUser, 201)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, 'Internal Server Error')
    })
}

const deleteUser = (req, res) => {
    const userId = req.params.id
    controller.remove(userId)
    .then(confirmation => {
        response.success(req, res, confirmation)
    })
    .catch(error => {
        console.log(error)
        response.error(req, res, 'Internal Server Error')
    })
}

router.get('/', listUsers)
router.get('/:id', getUser)
router.post('/', upsertUser)
router.put('/', secure('update'), upsertUser)
router.delete('/:id', deleteUser)

module.exports = router