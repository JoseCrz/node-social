const db = {
    'user': [
        { id: 1, name: 'José' }
    ]
}

const list = async table => {
    return db[table] || []
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

const query = async (table, requestedQuery) => {
    let collection = await list(table)
    const keys = Object.keys(requestedQuery)
    const key = keys[0]

    return collection.filter(item => item[key] === requestedQuery[key])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}