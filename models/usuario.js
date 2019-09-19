var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema;

var rolesValidos = {
    values : ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

var usuarioSchema = new Schema ({
    nombre: { type:String , required:[true, 'El usuario es Necesario']},
    email : {type: String, unique:true , require:[true , 'El Correo Es necesario']},
    password : {type: String, require:[true , 'La Contraseña  Es necesaria']},
    img : {type: String},
    role: {type:String , require:true , default:'ADMIN_ROle', enum : rolesValidos}
})

usuarioSchema.plugin(uniqueValidator , {message: '{PATH} Ya Se Encuentra Registrado'})
module.exports = mongoose.model('Usuario', usuarioSchema);