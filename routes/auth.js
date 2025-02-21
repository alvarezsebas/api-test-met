import express from "express";
import { AuthController } from "../controllers/index.js";

const api = express.Router();

// Ruta para registrar un nuevo usuario
api.post("/auth/register", AuthController.register);

// Ruta para iniciar sesión
api.post("/auth/login", AuthController.login);

export const authRoutes = api;
