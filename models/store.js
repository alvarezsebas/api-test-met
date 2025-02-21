import mongoose from "mongoose";

// Definición del esquema para la tienda (Store)
const StoreSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'El nombre es necesario'] // Campo obligatorio con mensaje de error personalizado
  },
  items: [{ 
    name: String,  // Nombre del producto
    price: Number  // Precio del producto
  }]
}, { 
  collection: 'store', // Nombre de la colección en la base de datos
  timestamps: { createdAt: 'fechaCreacion' } // Agrega automáticamente la fecha de creación con el nombre 'fechaCreacion'
});

// Exporta el modelo Store basado en el esquema definido
export const Store = mongoose.model("Store", StoreSchema);
