const nanoid = require('nanoid').nanoid
const auth = require('../auth')
const TABLE = 'users'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    
    const list = () => {
        return injectedStore.list(TABLE)
    }

    const get = id => {
        return injectedStore.get(TABLE, id)
    }

    const upsert = async body => {
        const user = {
            name: body.name,
            username: body.username
        }

        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid()
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
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
