const Remote = require('./remote')
const config = require('../config/config')

const host = config.cacheService.host
const port = config.cacheService.port

module.exports = new Remote(host, port)