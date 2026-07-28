const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

connection.connect((error) => {
  if (error) {
    console.error("Error de conexión a MySQL:", error.message);
    return;
  }

  console.log("MySQL conectado correctamente");
});

module.exports = connection;