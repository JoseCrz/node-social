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

const list = (table, id) => {
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

handleConnection()

module.exports = {
    list,
}