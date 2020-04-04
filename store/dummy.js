const db = {
    'user': [
        { id: 1, name: 'José' }
    ]
}

const list = async table => {
    return db[table]
}

const get = async (table, id) => {
    let collection = await list(table)
    return collection.filter(item => item.id === id)[0] || null
}

const upsert = async (table, data) => {
    if (!db[table]) {
        db[table] = []
    }
    db[table].push(data)

    console.log(db)
}

const remove = async (table, id) => {
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove
}