var mongoose = require('mongoose');
var modelSchema = mongoose.Schema({
    nombre: {
        required: [true, "El nombre es obligatorio"],
        type: String,
        minlength: [3, "El nombre es muy corto"],
        maxlength: [12, "El nombre es muy largo"],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        unique: [true, "Este email ya está registrado."]
    },
    password: {
        required: [true, "Escribe una contraseña"],
        type: String,
        minlength: [3, "La contraseña es muy corta"]
    },
    rol: {
        type: String,
        enum: ["Administrador", "Normal"],
        required: [true, "Seleccione un rol"]
    }
});

var Usuario = mongoose.model("Usuario", modelSchema)
module.exports = Usuario;