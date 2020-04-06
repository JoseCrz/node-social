const mysql = require('mysql')

const config = require('../config/config')

const dbConfig = {
    host: config.sql.host,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.name
}

let connection

const handleConnection = () => {
    connection = mysql.createConnection(dbConfig)

    connection.connect(error => {
        if (error) {
            console.error('[mysql error]', error)
            setTimeout(handleConnection, 2000)
        } else {
            console.log('[mysql] Database connected!')
        }
    })

    connection.on('error', error => {
        console.error('[mysql error]', error)
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection()
        } else {
            throw error
        }
    })
}

const list = table => {
    return new Promise((resolve, reject) => {
        const query =`SELECT * FROM ${table}`
        connection.query(query, (error, data) =>{
            if (error) {
                return reject(error)
            }
            resolve(data)
        })
    })
}

const get = (table, id) => {
    return new Promise((resolve, reject) => {

        const query = `SELECT * FROM ${table} WHERE id = '${id}'`
        console.log('[QUERY]',query)

        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

const _insert = (table, data) => {
    return new Promise ((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`

        connection.query(query, data, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })

}

const _update = (table, data) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${table} SET ? WHERE id=?`

        connection.query(query, [data, data.id], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

const upsert = (table, data) => {
    get(table, data.id)
    .then (result => {
        if (result.length === 0) {
            return _insert(table, data)
        }
        return _update(table, data)
    })
    .catch(error => console.log('[UPSERT]',error))
}

const query = (table, desiredQuery) => {
    return new Promise((resolve, reject) => {

        const query = `SELECT * FROM ${table} WHERE ?`

        connection.query(query, desiredQuery, (error, result)=> {
            if (error) {
                reject(error)
            }
            resolve(result[0] || null)
        })
    })
}

handleConnection()

module.exports = {
    list,
    get,
    upsert,
    query
}