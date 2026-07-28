// ======================================
// CARGAR VARIABLES DE ENTORNO
// ======================================

// Carga el archivo .env
//
// Ejemplo:
// PORT=3000
// JWT_SECRET=miclave

require("dotenv").config();


// ======================================
// IMPORTAR CONEXIÓN A LA BASE DE DATOS
// ======================================

// Ejecuta automáticamente la conexión
// con MySQL al iniciar el servidor

require("./config/db");


// ======================================
// IMPORTAR LIBRERÍAS
// ======================================

// Framework principal del backend

const express = require("express");

// Permite comunicación entre frontend
// y backend

const cors = require("cors");

// Agrega seguridad básica HTTP

const helmet = require("helmet");


// ======================================
// CREAR APP EXPRESS
// ======================================

// Creamos la aplicación principal
// IMPORTANTE:
// Debe existir antes de usar app.use()

const app = express();


// ======================================
// MIDDLEWARES GLOBALES
// ======================================


// --------------------------------------
// CORS
// --------------------------------------

// Permite peticiones entre frontend
// y backend
//
// Ejemplo:
//
// Frontend:
// localhost:5173
//
// Backend:
// localhost:3000

app.use(cors());



// --------------------------------------
// HELMET
// --------------------------------------

// Agrega cabeceras HTTP seguras
//
// Protege contra ataques comunes:
//
// - Clickjacking
// - XSS básicos
// - Algunas fugas de información

app.use(helmet());




// --------------------------------------
// EXPRESS JSON
// --------------------------------------

// Permite recibir información JSON
//
// Sin esto:
//
// req.body
//
// aparecerá undefined

app.use(express.json());


// ======================================
// IMPORTAR RUTAS
// ======================================


// --------------------------------------
// RUTAS DE AUTENTICACIÓN
// --------------------------------------

// Contiene:
//
// POST /register
// POST /login

const authRoutes = require(
    "./routes/auth.routes"
);



// --------------------------------------
// RUTAS DE USUARIO
// --------------------------------------

// Contiene:
//
// GET /profile

const userRoutes = require(
    "./routes/user.routes"
);


// ======================================
// USAR RUTAS
// ======================================


// --------------------------------------
// AUTH
// --------------------------------------

// Todo lo que exista en authRoutes
// tendrá automáticamente:
//
// /api/auth

app.use(
    "/api/auth",
    authRoutes
);


// --------------------------------------
// USER
// --------------------------------------

// Todo lo que exista en userRoutes
// tendrá automáticamente:
//
// /api/user

app.use(
    "/api/user",
    userRoutes
);


// ======================================
// RUTA DE PRUEBA
// ======================================

// Ruta para comprobar
// si el backend funciona

app.get("/", (req, res) => {

    res.json({

        message:
        "Backend SecureAuth funcionando"

    });

});


// ======================================
// CONFIGURAR PUERTO
// ======================================

// Usa el puerto del .env
// Si no existe usa 3000

const PORT = process.env.PORT || 3000;


// ======================================
// INICIAR SERVIDOR
// ======================================

app.listen(PORT, () => {

    console.log(

        `Servidor corriendo en puerto ${PORT}`

    );

});