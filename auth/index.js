const jwt = require('jsonwebtoken')
const errorUtil = require('../utils/errorUtil')
const JWT_SECRET = require('../config/config').jwtSecret

const sign = data => {
    // data = JSON.parse(JSON.stringify(data))
    return jwt.sign(data, JWT_SECRET)
}

const getToken = authorization => {
    if (!authorization) {
        throw errorUtil('There\'s no token', 401)
    }

    if(authorization.includes('Bearer ') === false) {
        throw errorUtil('Invalid tToken data', 401)
    }

    const token = authorization.replace('Bearer ', '')

    return token
}

const verifyToken = token => jwt.verify(token, JWT_SECRET)


const decodeHeader = req => {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const verifiedToken = verifyToken(token)

    req.user = verifiedToken
    return verifiedToken
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req)
        console.log(`[check own] decoded:`, decoded)

        // check ownership
        if (decoded.id !== owner) {
            throw errorUtil('Not allowed to do this', 401)
        }
    },

    logged: (req, owner) => {
        const decoded = decodeHeader(req)
    }
}



module.exports = {
    sign,
    check
}