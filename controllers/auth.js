import bscrypt from "bcryptjs"; // Importamos bcryptjs para encriptar contraseñas.
import { User } from "../models/index.js"; // Importamos el modelo User desde los modelos.
import { jwt } from "../utils/index.js"; // Importamos las funciones JWT para manejar autenticación.

/**
 * Registra un nuevo usuario en la base de datos.
 */
function register(req, res) {
  const { username, password } = req.body; // Extraemos los datos del request.

  const user = new User(); // Creamos una nueva instancia del usuario.

  // Generamos un salt y encriptamos la contraseña antes de guardarla.
  const salt = bscrypt.genSaltSync(10);
  const hashPassword = bscrypt.hashSync(password, salt);
  user.password = hashPassword; // Asignamos la contraseña encriptada.
  user.username = username; // Asignamos el nombre de usuario.

  // Guardamos el usuario en la base de datos.
  user.save((error, userStorage) => {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "Error al registrar el usuario" }); // Enviamos un mensaje de error si falla.
    } else {
      res.status(201).send(userStorage); // Devolvemos el usuario registrado si se almacena con éxito.
    }
  });
}

/**
 * Inicia sesión de usuario.
 */
function login(req, res) {
  const { username, password } = req.body; // Extraemos credenciales del request.

  // Buscamos el usuario en la base de datos por su nombre de usuario.
  User.findOne({ username: username }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" }); // Error interno del servidor.
    } else {
      if (!userStorage)
        return res.status(400).send({ msg: "Usuario no existe" }); // Si el usuario no se encuentra.

      // Comparamos la contraseña ingresada con la almacenada en la BD.
      bscrypt.compare(password, userStorage.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" }); // Error al comparar contraseñas.
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña incorrecta" }); // Si la contraseña es incorrecta.
        } else {
          // Si la autenticación es correcta, generamos los tokens de acceso y refresh.
          res.status(200).send({
            status: "success",
            user: userStorage,
            token: jwt.createAccessToken(userStorage), // Token de acceso.
            refresh: jwt.createRefreshToken(userStorage), // Token de refresco.
          });
        }
      });
    }
  });
}

/**
 * Renueva el token de acceso usando un refresh token.
 */
function refreshAccessToken(req, res) {
  const { refreshToken } = req.body; // Extraemos el token de refresco del request.

  if (!refreshToken) {
    return res.status(400).send({ msg: "Token requerido" }); // Si no se envía un token, devolvemos un error.
  }

  // Verificamos si el token de refresco ha expirado.
  const hasExpired = jwt.hasExpiredToken(refreshToken);
  if (hasExpired) {
    return res.status(400).send({ msg: "Token expirado" }); // Si expiró, no se puede renovar.
  }

  const { user_id } = jwt.decoded(refreshToken); // Decodificamos el token para obtener el ID del usuario.

  // Buscamos el usuario en la base de datos.
  User.findById(user_id, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" }); // Si hay un error en la consulta.
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage), // Generamos un nuevo token de acceso.
      });
    }
  });
}

// Exportamos el controlador con las funciones de autenticación.
export const AuthController = {
  login,
  register,
  refreshAccessToken,
};
