const store = require('../../../store/dummy')

const TABLE = 'user'

const list = () => {
    return store.list(TABLE)
}

module.exports = {
    list,
}