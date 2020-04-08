const Remote = require('./remote')
const config = require('../config/config')

const host = config.sqlService.host
const port = config.sqlService.port

module.exports = new Remote(host, port)