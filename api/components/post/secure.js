const auth = require('../../../auth')

module.exports = checkAuth = action => {
    
    const middleware = (req, res, next) => {
        switch (action) {
            case 'update':
                const owner = req.body.id
                auth.check.own(req, owner)
                next()
                break
            case 'post':
                auth.check.logged(req)
                next()
                break
            default:
                next()
        }
    }

    return middleware
}