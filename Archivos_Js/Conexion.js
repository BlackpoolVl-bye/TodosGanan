const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: "localhost",
    user: "Admin",
    password: "1234Local.",
    database: "bd_todosganan",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;