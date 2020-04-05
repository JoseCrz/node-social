const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

const listUsers = (req, res, next) => { // ? list all users
    controller.list()
    .then(list => {
        response.success(req, res, list)
    })
    .catch(next)
}

const getUser = (req, res, next) => { // ? get one user
    userId = parseInt(req.params.id)
    
    controller.get(userId)
    .then(user  => {
        response.success(req, res, user)
    })
    .catch(next)
}

const upsertUser = (req, res, next) => { // ? add one user
    console.log(req.body)
    controller.upsert(req.body)
    .then(createdUser => {
        response.success(req, res, createdUser, 201)
    })
    .catch(next)
}

const deleteUser = (req, res, next) => {
    const userId = req.params.id
    controller.remove(userId)
    .then(confirmation => {
        response.success(req, res, confirmation)
    })
    .catch(next)
}

router.get('/', listUsers)
router.get('/:id', getUser)
router.post('/', upsertUser)
router.put('/', secure('update'), upsertUser)
router.delete('/:id', deleteUser)

module.exports = router