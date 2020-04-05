const auth = require('../../../auth')

const TABLE = 'auth'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    
    const login = async (username, password) => {
        const data = await injectedStore.query(TABLE, { username: username}) 
        if (data.password === password) {
            return auth.sign(data)
        } else {
            throw new Error ('Invalid info')
        }
    }
    
    const upsert = user => {
        const authData = {
            id: user.id
        }

        if (user.username) {
            authData.username = user.username
        }

        if (user.password) {
            authData.password = user.password
        }

        return injectedStore.upsert(TABLE, authData)
    }

    return {
        upsert,
        login
    }
}