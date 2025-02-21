import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants.js";

// Función para crear un token de acceso para un usuario
function createAccessToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 24); // Expira en 24 horas

  const payload = {
    token_type: "access",
    user_id: user._id, // ID del usuario
    iat: Date.now(), // Fecha de emisión
    exp: expToken.getTime(), // Fecha de expiración
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY); // Firmar el token con la clave secreta
}

// Función para crear un token de acceso para un taller
function createAccessTokenApp(taller) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 24); // Expira en 24 horas

  const payload = {
    token_type: "access",
    taller_id: taller._id, // ID del taller
    iat: Date.now(), // Fecha de emisión
    exp: expToken.getTime(), // Fecha de expiración
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY); // Firmar el token con la clave secreta
}

// Función para crear un token de actualización (refresh token) para un taller
function createRefreshTokenApp(taller) {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1); // Expira en 1 mes

  const payload = {
    token_type: "refresh",
    taller_id: taller._id, // ID del taller
    iat: Date.now(), // Fecha de emisión
    exp: expToken.getTime(), // Fecha de expiración
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY); // Firmar el token con la clave secreta
}

// Función para crear un token de actualización (refresh token) para un usuario
function createRefreshToken(user) {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1); // Expira en 1 mes

  const payload = {
    token_type: "refresh",
    user_id: user._id, // ID del usuario
    iat: Date.now(), // Fecha de emisión
    exp: expToken.getTime(), // Fecha de expiración
  };

  return jsonwebtoken.sign(payload, JWT_SECRET_KEY); // Firmar el token con la clave secreta
}

// Función para decodificar un token
function decoded(token) {
  return jsonwebtoken.decode(token, JWT_SECRET_KEY, true); // Decodificar sin verificar la firma
}

// Función para verificar si un token ha expirado
function hasExpiredToken(token) {
  const { exp } = decoded(token); // Obtener la fecha de expiración
  const currentDate = new Date().getTime(); // Obtener la fecha actual en milisegundos

  return exp <= currentDate; // Retorna true si el token ha expirado
}

// Exportar las funciones
export const jwt = {
  createAccessToken,
  createRefreshToken,
  decoded,
  hasExpiredToken,
  createAccessTokenApp,
  createRefreshTokenApp
};
