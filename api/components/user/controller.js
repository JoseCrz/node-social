const TABLE = 'user'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    
    const list = () => {
        return injectedStore.list(TABLE)
    }

    const get = id => {
        return injectedStore.get(TABLE, id)
    }

    const upsert = user => {
        return injectedStore.upsert(TABLE, user)
    }

    const remove = id => {
        return injectedStore.remove(TABLE, id)
    }

    return {
        list,
        get,
        upsert,
        remove
    }
}
