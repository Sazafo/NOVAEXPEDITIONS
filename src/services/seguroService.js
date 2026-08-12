const Seguro=require('../models/seguro');
const obtener=async()=>await Seguro.find();
const obtenerPorId=async id=>await Seguro.findById(id);
const crear=async datos=>await new Seguro(datos).save();
const actualizar=async(id,datos)=>await Seguro.findByIdAndUpdate(id,datos,{new:true,runValidators:true});
const eliminar=async id=>await Seguro.findByIdAndDelete(id);
module.exports={obtener,obtenerPorId,crear,actualizar,eliminar};
