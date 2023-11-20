const mysql = require("mysql2/promise")

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'gs',
    password: 'Rafinhahm1$',
})

module.exports = connection;