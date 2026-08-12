const express=require('express');
const c=require('../controllers/empleadoController');
const router=express.Router();
router.get('/',c.obtener);
router.get('/:id',c.obtenerPorId);
router.post('/',c.crear);
router.put('/:id',c.actualizar);
router.delete('/:id',c.eliminar);
module.exports=router;
