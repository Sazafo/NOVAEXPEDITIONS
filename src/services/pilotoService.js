const Piloto=require('../models/piloto');
const obtener=async()=>await Piloto.find();
const obtenerPorId=async id=>await Piloto.findById(id);
const crear=async datos=>await new Piloto(datos).save();
const actualizar=async(id,datos)=>await Piloto.findByIdAndUpdate(id,datos,{new:true,runValidators:true});
const eliminar=async id=>await Piloto.findByIdAndDelete(id);
module.exports={obtener,obtenerPorId,crear,actualizar,eliminar};
