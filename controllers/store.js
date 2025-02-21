import { Store } from "../models/index.js";

/**
 * Crea una nueva tienda en la base de datos.
 */
async function createStore(req, res) {
    let store = new Store();
    store.name = req.body.nombre;
    store.items = [];
    console.log(req.body);
    
    store.save((error, storeStorage) => {
        if (error) {
            console.error("Error al crear la tienda:", error);
            res.status(400).send({ msg: "Error al crear la tienda" });
        } else {
            res.status(201).send({ msg: "Tienda almacenada con éxito" });
        }
    });
}

/**
 * Obtiene todas las tiendas almacenadas en la base de datos.
 */
async function getStores(req, res) {
    try {
        const stores = await Store.find({});
        res.status(200).json({ stores });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            ok: false,
            mensaje: "Error del servidor",
            errors: error.message,
        });
    }
}

/**
 * Agrega un nuevo producto a una tienda específica.
 */
async function addItemToStore(req, res) {
    try {
        const { id } = req.params; // ID de la tienda
        console.log(req.body);
        
        if (!req.body.producto) {
            return res.status(400).json({
                ok: false,
                mensaje: "El campo 'producto' es requerido"
            });
        }

        // Buscar la tienda en la base de datos
        const store = await Store.findById(id);
        if (!store) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tienda no encontrada"
            });
        }

        // Agregar el producto a la lista de items
        store.items.push(req.body.producto);
        await store.save();

        res.status(200).json({
            ok: true,
            mensaje: "Producto agregado correctamente",
            store
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            ok: false,
            mensaje: "Error del servidor",
            errors: error.message,
        });
    }
}

/**
 * Actualiza un producto específico dentro de una tienda.
 */
async function updateItem(req, res) {
    try {
        const { idTienda, idProducto } = req.params;
        const { name, price } = req.body; // Datos a actualizar

        // Buscar la tienda en la base de datos
        const store = await Store.findById(idTienda);
        if (!store) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tienda no encontrada"
            });
        }

        // Buscar el producto dentro del array de items
        const producto = store.items.id(idProducto);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            });
        }

        // Actualizar solo los campos proporcionados
        if (name) producto.name = name;
        if (price) producto.price = price;

        // Guardar los cambios
        await store.save();

        res.status(200).json({
            ok: true,
            mensaje: "Producto actualizado correctamente",
            producto
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            ok: false,
            mensaje: "Error del servidor",
            errors: error.message
        });
    }
}

/**
 * Elimina un producto específico dentro de una tienda.
 */
async function deleteItem(req, res) {
    try {
        const { idTienda, idProducto } = req.params;

        // Buscar la tienda en la base de datos
        const store = await Store.findById(idTienda);
        if (!store) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tienda no encontrada"
            });
        }

        // Buscar y eliminar el producto del array de items
        const productoIndex = store.items.findIndex(item => item._id.toString() === idProducto);
        if (productoIndex === -1) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            });
        }

        store.items.splice(productoIndex, 1);
        await store.save();

        res.status(200).json({
            ok: true,
            mensaje: "Producto eliminado correctamente"
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            ok: false,
            mensaje: "Error del servidor",
            errors: error.message
        });
    }
}

/**
 * Elimina una tienda específica de la base de datos.
 */
async function deleteStore(req, res) {
    try {
        const { id } = req.params; // ID de la tienda a eliminar

        // Buscar y eliminar la tienda en la base de datos
        const store = await Store.findByIdAndDelete(id);

        if (!store) {
            return res.status(404).json({
                ok: false,
                mensaje: "Tienda no encontrada"
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: "Tienda eliminada correctamente",
            store
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            ok: false,
            mensaje: "Error del servidor",
            errors: error.message,
        });
    }
}

// Exportar el controlador con las funciones
export const StoreController = {
    createStore,
    getStores,
    addItemToStore,
    updateItem,
    deleteItem,
    deleteStore
};
