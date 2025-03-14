const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "Admin",
    password: "1234Local.",
    database: "bd_todosganan"
});

connection.connect((error) => {
    if (error) {
        console.error("Error BD:", error);
        return;
    }
    console.log("Conexión exitosa");
});

module.exports = connection;