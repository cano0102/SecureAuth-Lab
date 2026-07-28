// ======================================
// IMPORTAR JWT
// ======================================

// Necesitamos JWT para verificar
// si el token enviado es válido

const jwt = require("jsonwebtoken");


// ======================================
// MIDDLEWARE DE AUTENTICACIÓN
// ======================================

// Middleware = función que se ejecuta
// antes de llegar a una ruta

const verifyToken = (req, res, next) => {

    // ==========================
    // OBTENER TOKEN
    // ==========================

    // Leemos el header:
    //
    // Authorization:
    // Bearer eyJhbGciOi...

    const authHeader = req.headers.authorization;


    // ==========================
    // VALIDAR SI EXISTE TOKEN
    // ==========================

    if (!authHeader) {

        return res.status(401).json({

            message: "Acceso denegado. Token requerido"

        });

    }


    // ==========================
    // EXTRAER TOKEN
    // ==========================

    // Separamos:
    //
    // "Bearer eyJhbG..."
    //
    // para obtener solo:
    //
    // eyJhbG...

    const token = authHeader.split(" ")[1];


    // ==========================
    // VERIFICAR TOKEN
    // ==========================

    jwt.verify(

        token,

        process.env.JWT_SECRET,

        (error, decoded) => {

            if (error) {

                return res.status(403).json({

                    message: "Token inválido"

                });

            }

            // Guardamos los datos
            // del usuario para usarlos
            // en otras rutas

            req.user = decoded;

            next();

        }

    );

};


// ======================================
// EXPORTAR
// ======================================

module.exports = verifyToken;