const express = require('express')

const response = require('../network/response')
const store = require('../store/redis')

const router = express.Router()

const list = async (req, res, next) => {
    const data = await store.list(req.params.table)
    response.success(req, res, data, 200)
}

const get = async () => {
    const data = await store.get(req.params.table, req.params.id)
    response.success(req, res, data, 200)
}

// const insert = async () => {
//     const data = await store.insert(req.params.table, req.body)
//     response.success(req, res, data, 200)
// }

const update = async () => {
    const data = await store.insert(req.params.table, req.body)
    response.success(req, res, data, 200)
}

router.get('/:table', list)
router.get('/:table/:id', get)
// router.post('/:table', insert)
router.put('/:table', update)

module.exports = router