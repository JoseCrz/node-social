const controller = require('./controller')
// const store = require('../../../store/mysql')
const store = require('../../../store/remote-mysql')

module.exports = controller(store)