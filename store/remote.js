const request = require('request')

function createRemoteDB (host, port) {
    const URL = `http://${host}:${port}`
    
    const req = (method, table, data) => {
        const url = `${URL}/${table}`
        let body = ''

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (error, request, body) => {
                if (error) {
                    console.log('Error connecting with REMOTE DB', error)
                    return reject(error.message)
                }

                const response = JSON.parse(body)
                return resolve(response.body)
            })
        })
    }
    const list = table => {
        return req('GET', table)
    }

    return {
        list
    }
}

module.exports = createRemoteDB
