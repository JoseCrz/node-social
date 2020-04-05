const jwt = require('jsonwebtoken')

const sign = data => {
    return jwt.sign(data, 'secret')
}

module.exports = {
    sign
}