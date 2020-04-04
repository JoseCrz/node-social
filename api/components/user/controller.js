const TABLE = 'user'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    
    const list = () => {
        return injectedStore.list(TABLE)
    }

    const get = id => {
        return injectedStore.get(TABLE, id)
    }

    return {
        list,
        get,
    }
}
