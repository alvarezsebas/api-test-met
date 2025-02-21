import mongoose from "mongoose";

// Definición del esquema para el usuario
const UserSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'El nombre es necesario'] // Campo obligatorio con mensaje de error personalizado
  },
  password: { 
    type: String, 
    required: [true, 'La contraseña es necesaria'] // Campo obligatorio con mensaje de error personalizado
  },
}, { 
  collection: 'users', // Nombre de la colección en la base de datos
  timestamps: { createdAt: 'fechaCreacion' } // Agrega automáticamente la fecha de creación con el nombre 'fechaCreacion'
});

// Exporta el modelo User basado en el esquema definido
export const User = mongoose.model("User", UserSchema);


