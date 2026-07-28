// ======================================
// IMPORTAR EXPRESS
// ======================================

const express = require("express");


// ======================================
// CREAR ROUTER
// ======================================

const router = express.Router();


// ======================================
// IMPORTAR MIDDLEWARE
// ======================================

// Importamos nuestro guardia de seguridad

const verifyToken = require("../middlewares/authMiddleware");


// ======================================
// RUTA PROTEGIDA
// ======================================

// Solo usuarios con token válido
// pueden entrar aquí

router.get(

    "/profile",

    verifyToken,

    (req, res) => {

        res.json({

            message: "Acceso autorizado",

            usuario: req.user

        });

    }

);


// ======================================
// EXPORTAR
// ======================================

module.exports = router;