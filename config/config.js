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
    }

}
module.exports = config