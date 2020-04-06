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

        const query = `SELECT * FROM ${table} WHERE id = ${id}`

        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

const insert = (table, data) => {
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

const upsert = (table, data) => {
    return insert(table, data)
}

handleConnection()

module.exports = {
    list,
    get,
    insert,
    upsert
}