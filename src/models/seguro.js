const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    nombre: { type: String, required: true },
    aseguradora: { type: String, required: true },
    tipoCobertura: { type: String, required: true },
    precio: { type: Number, required: true },
    estado: { type: String, required: true }
});
module.exports=mongoose.model('Seguro',schema);
