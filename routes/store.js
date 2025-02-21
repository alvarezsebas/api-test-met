import express from "express";
import { StoreController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/authenticated.js";

const api = express.Router();

// Ruta para crear una nueva tienda
api.post("/store", mdAuth.asureAuth, StoreController.createStore);

// Ruta para obtener todas las tiendas
api.get("/store", mdAuth.asureAuth, StoreController.getStores);

// Ruta para agregar un nuevo ítem a una tienda específica
api.post("/store/items/:id", mdAuth.asureAuth, StoreController.addItemToStore);

// Ruta para actualizar un ítem dentro de una tienda específica
api.put("/store/:idTienda/item/:idProducto", mdAuth.asureAuth, StoreController.updateItem);

// Ruta para eliminar un ítem de una tienda específica
api.delete("/store/:idTienda/item/:idProducto", mdAuth.asureAuth, StoreController.deleteItem);

// Ruta para eliminar una tienda por su ID
api.delete("/store/:id", mdAuth.asureAuth, StoreController.deleteStore);

export const storeRoutes = api;
