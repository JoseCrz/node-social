const TABLE = 'post'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    const list = () => {
        return injectedStore.list(TABLE)
    }

    return {
        list
    }
}