const nanoid = require('nanoid').nanoid
const TABLE = 'post'

module.exports = (injectedStore = require('../../../store/dummy')) => {
    const list = () => {
        return injectedStore.list(TABLE)
    }

    const addPost = ({text, user}) => {
        const post = {
            id: nanoid(),
            text,
            user
        }

        return injectedStore.insert(TABLE, post)
    }

    return {
        list,
        addPost
    }
}