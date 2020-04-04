import { nanoid } from 'nanoid'

const TABLE = 'user'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    
    const list = () => {
        return injectedStore.list(TABLE)
    }

    const get = id => {
        return injectedStore.get(TABLE, id)
    }

    const upsert = body => {
        const user = {
            name: body.name
        }

        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid()
        }
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
