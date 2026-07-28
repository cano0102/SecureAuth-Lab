// ================================
// IMPORTACIONES
// ================================

// Importamos la conexión a MySQL
// Este archivo viene de config/db.js
const connection = require("../config/db");

// Importamos bcrypt
// Sirve para convertir contraseñas normales en hashes seguros
const bcrypt = require("bcrypt");


// ================================
// FUNCIÓN REGISTER
// ================================

// ========================================
// IMPORTAR JWT
// ========================================

const jwt = require("jsonwebtoken");


// ========================================
// LOGIN
// ========================================

const login = async (req, res) => {

  try {

    // Obtener datos enviados
    const { email, password } = req.body;


    // ==============================
    // Validar campos vacíos
    // ==============================

    if (!email || !password) {

      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });

    }


    // ==============================
    // Buscar usuario
    // ==============================

    const query =
      "SELECT * FROM usuarios WHERE email = ?";


    connection.query(

      query,
      [email],

      async (error, results) => {

        // Error DB
        if (error) {

          return res.status(500).json({
            message: "Error en servidor",
            error
          });

        }


        // Usuario no existe
        if (results.length === 0) {

          return res.status(400).json({
            message: "Usuario no encontrado"
          });

        }


        // Obtener usuario encontrado
        const user = results[0];


        // ==============================
        // Comparar contraseña
        // ==============================

        const isMatch =
          await bcrypt.compare(
            password,
            user.password
          );


        // Contraseña incorrecta
        if (!isMatch) {

          return res.status(400).json({
            message: "Contraseña incorrecta"
          });

        }


        // ==============================
        // Generar JWT
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
        // Login correcto
        // ==============================

        res.status(200).json({

          message: "Login exitoso",

          token,

          user: {

            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol

          }

        });

      }

    );

  } catch(error){

    res.status(500).json({
      message:"Error interno",
      error
    });

  }

};

// async significa que esta función trabajará
// con procesos asíncronos (base de datos, bcrypt, etc)
const register = async (req, res) => {

  // try/catch evita que el servidor se caiga
  // si ocurre un error inesperado
  try {

    // ==========================================
    // OBTENER DATOS DEL BODY
    // ==========================================

    // req.body contiene los datos enviados
    // desde el frontend

    // Ejemplo:
    // {
    //   "nombre": "Anderson",
    //   "email": "test@test.com",
    //   "password": "123456"
    // }

    // Extraemos esos valores del body
    const { nombre, email, password } = req.body;


    // ==========================================
    // VALIDAR CAMPOS VACÍOS
    // ==========================================

    // Si falta alguno de los campos:
    // nombre, email o password
    // devolvemos error 400

    if (!nombre || !email || !password) {

      // return detiene la ejecución
      return res.status(400).json({

        // Mensaje que recibirá el frontend
        message: "Todos los campos son obligatorios",
      });
    }


    // ==========================================
    // VERIFICAR SI EL USUARIO YA EXISTE
    // ==========================================

    // Query SQL para buscar usuario por email

    // El ? es MUY importante
    // porque evita SQL Injection

    const checkUserQuery =
      "SELECT * FROM usuarios WHERE email = ?";


    // ==========================================
    // EJECUTAR QUERY
    // ==========================================

    // connection.query ejecuta SQL

    // Parámetros:
    // 1. Query SQL
    // 2. Valores que reemplazan los ?
    // 3. Callback con resultado

    connection.query(

      // Query SQL
      checkUserQuery,

      // Reemplaza ? por email
      [email],

      // Callback que recibe:
      // error -> si algo falla
      // results -> resultados encontrados
      async (error, results) => {


        // ==========================================
        // ERROR CONSULTANDO USUARIO
        // ==========================================

        if (error) {

          return res.status(500).json({

            // Error del servidor
            message: "Error verificando usuario",

            // Error completo
            error,
          });
        }


        // ==========================================
        // USUARIO YA EXISTE
        // ==========================================

        // results.length indica cuántos usuarios encontró

        // Si es mayor que 0:
        // el correo ya existe

        if (results.length > 0) {

          return res.status(400).json({

            message: "El correo ya existe",
          });
        }


        // ==========================================
        // HASH DE CONTRASEÑA
        // ==========================================

        // bcrypt.hash convierte la contraseña
        // en un hash seguro

        // password -> contraseña original
        // 10 -> salt rounds (nivel de seguridad)

        // await espera a que bcrypt termine

        const hashedPassword =
          await bcrypt.hash(password, 10);


        // ==========================================
        // QUERY INSERT
        // ==========================================

        // Insertaremos:
        // nombre
        // email
        // contraseña hasheada

        const insertQuery = `
          INSERT INTO usuarios
          (nombre, email, password)
          VALUES (?, ?, ?)
        `;


        // ==========================================
        // INSERTAR USUARIO
        // ==========================================

        connection.query(

          // Query SQL
          insertQuery,

          // Valores que reemplazan los ?
          [
            nombre,
            email,
            hashedPassword
          ],

          // Callback resultado INSERT
          (error, result) => {


            // ==========================================
            // ERROR INSERTANDO USUARIO
            // ==========================================

            if (error) {

              return res.status(500).json({

                message: "Error registrando usuario",

                error,
              });
            }


            // ==========================================
            // REGISTRO EXITOSO
            // ==========================================

            // status 201 significa:
            // CREATED

            res.status(201).json({

              message:
                "Usuario registrado correctamente",
            });
          }
        );
      }
    );

  } catch (error) {

    // ==========================================
    // ERROR GENERAL DEL SERVIDOR
    // ==========================================

    res.status(500).json({

      message: "Error interno del servidor",

      error,
    });
  }
};


// ================================
// EXPORTAR FUNCIÓN
// ================================

// Permite usar register
// en otros archivos

module.exports = {
  register,
  login
};

