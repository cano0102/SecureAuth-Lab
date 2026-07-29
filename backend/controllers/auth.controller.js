// ================================
// IMPORTACIONES
// ================================

// Importamos el pool de conexión a PostgreSQL
// Este archivo debe conectarse a Neon mediante DATABASE_URL
const pool = require("../config/db");

// Importamos bcrypt
// Sirve para convertir contraseñas normales en hashes seguros
const bcrypt = require("bcrypt");

// Importamos JWT
// Se utiliza para generar tokens de autenticación
const jwt = require("jsonwebtoken");


// ========================================
// LOGIN
// ========================================

const login = async (req, res) => {

  try {

    // ==============================
    // OBTENER DATOS
    // ==============================

    const { email, password } = req.body;


    // ==============================
    // VALIDAR CAMPOS VACÍOS
    // ==============================

    if (!email || !password) {

      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });

    }


    // ==============================
    // BUSCAR USUARIO
    // ==============================

    // PostgreSQL utiliza $1 en lugar de ?
    const query = `
      SELECT *
      FROM usuarios
      WHERE email = $1
    `;


    // Ejecutamos la consulta
    const result = await pool.query(
      query,
      [email]
    );


    // ==============================
    // USUARIO NO EXISTE
    // ==============================

    if (result.rows.length === 0) {

      return res.status(400).json({
        message: "Usuario no encontrado"
      });

    }


    // ==============================
    // OBTENER USUARIO
    // ==============================

    // PostgreSQL devuelve los resultados
    // dentro de result.rows

    const user = result.rows[0];


    // ==============================
    // COMPARAR CONTRASEÑA
    // ==============================

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    // ==============================
    // CONTRASEÑA INCORRECTA
    // ==============================

    if (!isMatch) {

      return res.status(400).json({
        message: "Contraseña incorrecta"
      });

    }


    // ==============================
    // GENERAR JWT
    // ==============================

    const token = jwt.sign(

      {
        id: user.id,
        email: user.email,
        rol: user.rol
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1h"
      }

    );


    // ==============================
    // LOGIN CORRECTO
    // ==============================

    return res.status(200).json({

      message: "Login exitoso",

      token,

      user: {

        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol

      }

    });


  } catch (error) {

    console.error(
      "Error en login:",
      error
    );

    return res.status(500).json({

      message: "Error interno del servidor"

    });

  }

};


// ========================================
// REGISTER
// ========================================

const register = async (req, res) => {

  try {

    // ==========================================
    // OBTENER DATOS DEL BODY
    // ==========================================

    const {
      nombre,
      email,
      password
    } = req.body;


    // ==========================================
    // VALIDAR CAMPOS
    // ==========================================

    if (!nombre || !email || !password) {

      return res.status(400).json({

        message:
          "Todos los campos son obligatorios"

      });

    }


    // ==========================================
    // VERIFICAR SI EL USUARIO YA EXISTE
    // ==========================================

    const checkUserQuery = `
      SELECT id
      FROM usuarios
      WHERE email = $1
    `;


    // Ejecutar consulta
    const userResult = await pool.query(

      checkUserQuery,

      [email]

    );


    // ==========================================
    // USUARIO YA EXISTE
    // ==========================================

    if (userResult.rows.length > 0) {

      return res.status(400).json({

        message:
          "El correo ya existe"

      });

    }


    // ==========================================
    // HASH DE CONTRASEÑA
    // ==========================================

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    // ==========================================
    // INSERTAR USUARIO
    // ==========================================

    // PostgreSQL utiliza:
    // $1
    // $2
    // $3

    // RETURNING id devuelve el ID
    // del usuario recién creado

    const insertQuery = `
      INSERT INTO usuarios
      (
        nombre,
        email,
        password
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING id
    `;


    // Ejecutar INSERT

    const insertResult = await pool.query(

      insertQuery,

      [
        nombre,
        email,
        hashedPassword
      ]

    );


    // ==========================================
    // REGISTRO EXITOSO
    // ==========================================

    return res.status(201).json({

      message:
        "Usuario registrado correctamente",

      user: {

        id:
          insertResult.rows[0].id,

        nombre,

        email

      }

    });


  } catch (error) {

    // ==========================================
    // ERROR GENERAL
    // ==========================================

    console.error(
      "Error en registro:",
      error
    );


    return res.status(500).json({

      message:
        "Error interno del servidor"

    });

  }

};


// ========================================
// EXPORTAR CONTROLADORES
// ========================================

module.exports = {

  register,

  login

};