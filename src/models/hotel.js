const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    capacidad: { type: Number, required: true },
    precioNoche: { type: Number, required: true },
    estado: { type: String, required: true }
});
module.exports=mongoose.model('Hotel',schema);
