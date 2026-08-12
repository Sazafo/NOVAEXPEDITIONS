const Hotel=require('../models/hotel');
const obtener=async()=>await Hotel.find();
const obtenerPorId=async id=>await Hotel.findById(id);
const crear=async datos=>await new Hotel(datos).save();
const actualizar=async(id,datos)=>await Hotel.findByIdAndUpdate(id,datos,{new:true,runValidators:true});
const eliminar=async id=>await Hotel.findByIdAndDelete(id);
module.exports={obtener,obtenerPorId,crear,actualizar,eliminar};
