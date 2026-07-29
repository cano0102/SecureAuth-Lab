const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then((client) => {
    console.log("✅ PostgreSQL conectado correctamente");
    client.release();
  })
  .catch((error) => {
    console.error("❌ Error de conexión a PostgreSQL:", error.message);
  });

module.exports = pool;