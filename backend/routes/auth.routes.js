// ======================================
// IMPORTAR EXPRESS
// ======================================

const express = require("express");


// ======================================
// CREAR ROUTER
// ======================================

const router = express.Router();


// ======================================
// IMPORTAR CONTROLLERS
// ======================================

// Importamos register y login
// desde authController.js

const {

  register,
  login

} = require("../controllers/auth.controller");


// ======================================
// RUTA REGISTER
// ======================================

// POST /api/auth/register

router.post(

  "/register",

  register

);


// ======================================
// RUTA LOGIN
// ======================================

// POST /api/auth/login

router.post(

  "/login",

  login

);


// ======================================
// EXPORTAR ROUTER
// ======================================

module.exports = router;