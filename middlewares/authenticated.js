import { jwt } from "../utils/index.js";

async function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    console.warn("Solicitud sin encabezado de autorización");
    return res.status(403).send({ msg: "La petición no tiene la cabecera de autenticación" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");
  console.log("Token recibido:", token);

  try {
    // Verifica si el token ha expirado
    const hasExpired = hasExpiredToken(token);
    if (hasExpired) {
      return res.status(401).send({ msg: "El token ha expirado" });
    }

    // Decodifica y valida el token
    const payload = jwt.decoded(token);
    req.user = payload; // Asigna el usuario a la solicitud

    next(); // Continúa al siguiente middleware
  } catch (error) {
    console.error("Error al procesar el token:", error.message);
    return res.status(401).send({ msg: "Token inválido", error: error.message });
  }
}

function hasExpiredToken(token) {
  const decoded = jwt.decoded(token);
  if (!decoded || !decoded.exp) {
    return true; // Si no tiene expiración, asumimos que es inválido
  }
  const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  return decoded.exp < now; // Compara la expiración con el tiempo actual
}

export const mdAuth = {
  asureAuth,
};
