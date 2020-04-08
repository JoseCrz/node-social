const nanoid = require('nanoid').nanoid
const TABLE = 'post'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    const list = () => {
        return injectedStore.list(TABLE)
    }

    const addPost = (userId, text) => {
        const post = {
            id: nanoid(),
            text,
            user: userId
        }

        return injectedStore.insert(TABLE, post)
    }

    return {
        list,
        addPost
    }
}