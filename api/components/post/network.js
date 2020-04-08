const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

const list = (req, res, next) => {
    controller.list()
    .then(data => {
        response.success(req, res, data, 200)
    })
    .catch(next)
}

const addPost = (req, res, next) => {
    controller.addPost(req.body)
    .then(post => {
        response.success(req, res, post, 201)
    })
    .catch(next)
}





//Routes
router.get('/', list)
router.post('/', addPost)

module.exports = router