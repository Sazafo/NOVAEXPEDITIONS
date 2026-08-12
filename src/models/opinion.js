const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    cliente: { type: String, required: true },
    paquete: { type: String, required: true },
    calificacion: { type: Number, required: true },
    comentario: { type: String, required: true },
    fecha: { type: String, required: true }
});
module.exports=mongoose.model('Opinion',schema);
