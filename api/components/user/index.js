const controller = require('./controller')
const config = require('../../../config/config')

let store

if (config.remoteDB === true) {
    store = require('../../../store/remote-mysql')
} else {
    store = require('../../../store/mysql')
}

module.exports = controller(store)