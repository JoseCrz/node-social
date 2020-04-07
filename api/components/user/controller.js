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
            console.log('[user controller call auth upsert]')
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

    const follow = (from, to) => {
        return injectedStore.insert('user_follow', {
            user_from: from,
            user_to: to
        })
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow
    }
}
