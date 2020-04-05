const bcrypt = require('bcrypt')
const auth = require('../../../auth')

const TABLE = 'auth'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    
    const login = async (username, password) => {
        const data = await injectedStore.query(TABLE, { username: username}) 
        
        const access = await bcrypt.compare(password, data.password)
        
        if (!access) {
            throw new Error ('Invalid info')
        }
        
        return auth.sign(data)
    }
    
    const upsert = async user => {
        const authData = {
            id: user.id
        }

        if (user.username) {
            authData.username = user.username
        }

        if (user.password) {
            authData.password = await bcrypt.hash(user.password, 5)
        }

        return injectedStore.upsert(TABLE, authData)
    }

    return {
        upsert,
        login
    }
}