require('dotenv').config()
const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    sql: {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        host: process.env.SQL_HOST,
        name: process.env.SQL_NAME
    },
    sqlService: {
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT,
    },
    postService: {
        port: process.env.POST_SERVICE_PORT,
    },
    remoteDB: process.env.REMOTE_DB || false,
    cacheService : {
        host: process.env.CACHE_SERVICE_HOST || 'localhost',
        port: process.env.CACHE_SERVICE_PORT,
    }
}
module.exports = config