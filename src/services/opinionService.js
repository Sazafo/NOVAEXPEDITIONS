const Opinion=require('../models/opinion');
const obtener=async()=>await Opinion.find();
const obtenerPorId=async id=>await Opinion.findById(id);
const crear=async datos=>await new Opinion(datos).save();
const actualizar=async(id,datos)=>await Opinion.findByIdAndUpdate(id,datos,{new:true,runValidators:true});
const eliminar=async id=>await Opinion.findByIdAndDelete(id);
module.exports={obtener,obtenerPorId,crear,actualizar,eliminar};
