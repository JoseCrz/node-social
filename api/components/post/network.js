const express = require('express')

const secure = require('./secure')
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
    controller.addPost(req.user.id,req.body.text)
    .then(post => {
        response.success(req, res, post, 201)
    })
    .catch(next)
}


const updatePost = (req, res, next) => {
    const userId = req.user.id
    const postId = req.params.id
    const text = req.body.text
    const postOwner = req.body.user
    controller.updatePost(userId, postId, text)
    .then(data => {
        response.success(req, res, data, 200)
    })
    .catch(next)
}


//Routes
router.get('/', list)
router.post('/', secure('post') ,addPost)
router.put('/:id', secure('update'), updatePost)

module.exports = router