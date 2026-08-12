const service=require('../services/opinionService');
const obtener=async(req,res)=>{try{res.json(await service.obtener())}catch(e){res.status(500).json({mensaje:e.message})}};
const obtenerPorId=async(req,res)=>{try{const d=await service.obtenerPorId(req.params.id);if(!d)return res.status(404).json({mensaje:'No encontrado'});res.json(d)}catch(e){res.status(500).json({mensaje:e.message})}};
const crear=async(req,res)=>{try{res.status(201).json(await service.crear(req.body))}catch(e){res.status(400).json({mensaje:e.message})}};
const actualizar=async(req,res)=>{try{res.json(await service.actualizar(req.params.id,req.body))}catch(e){res.status(400).json({mensaje:e.message})}};
const eliminar=async(req,res)=>{try{await service.eliminar(req.params.id);res.json({mensaje:'Eliminado correctamente'})}catch(e){res.status(500).json({mensaje:e.message})}};
module.exports={obtener,obtenerPorId,crear,actualizar,eliminar};
