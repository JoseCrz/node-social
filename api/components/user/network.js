const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('All good')
})

module.exports = router