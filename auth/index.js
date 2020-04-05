const jwt = require('jsonwebtoken')

const JWT_SECRET = require('../config/config').jwtSecret

const sign = data => {
    return jwt.sign(data, JWT_SECRET)
}

const getToken = authorization => {
    if (!authorization) {
        throw new Error('There\'s no token')
    }

    if(authorization.includes('Bearer ') === false) {
        throw new Error('Invalid Token Format')
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
        console.log(decoded)
    }
}



module.exports = {
    sign,
    check
}