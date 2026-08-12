const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    nombre: { type: String, required: true },
    licencia: { type: String, required: true },
    experienciaAnios: { type: Number, required: true },
    especialidad: { type: String, required: true },
    estado: { type: String, required: true }
});
module.exports=mongoose.model('Piloto',schema);
