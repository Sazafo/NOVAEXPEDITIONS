const Empleado=require('../models/empleado');
const obtener=async()=>await Empleado.find();
const obtenerPorId=async id=>await Empleado.findById(id);
const crear=async datos=>await new Empleado(datos).save();
const actualizar=async(id,datos)=>await Empleado.findByIdAndUpdate(id,datos,{new:true,runValidators:true});
const eliminar=async id=>await Empleado.findByIdAndDelete(id);
module.exports={obtener,obtenerPorId,crear,actualizar,eliminar};
