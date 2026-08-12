const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    puesto: { type: String, required: true },
    telefono: { type: String, required: true },
    estado: { type: String, required: true }
});
module.exports=mongoose.model('Empleado',schema);
