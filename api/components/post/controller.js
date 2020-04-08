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

    const updatePost = (userId, postId, text, postOwner) => {
        const newPost = {
            id: postId,
            text,
            user: userId
        }
        return injectedStore.update(TABLE, newPost)
    }

    return {
        list,
        addPost,
        updatePost
    }
}