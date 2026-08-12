const API='/api/opiniones';const form=document.getElementById('form');const registroId=document.getElementById('registroId');const tabla=document.getElementById('tabla');const guardar=document.getElementById('guardar');const cancelar=document.getElementById('cancelar');
const cliente=document.getElementById('cliente');
const paquete=document.getElementById('paquete');
const calificacion=document.getElementById('calificacion');
const comentario=document.getElementById('comentario');
const fecha=document.getElementById('fecha');
document.addEventListener('DOMContentLoaded',listar);
form.addEventListener('submit',async e=>{e.preventDefault();const datos={cliente:cliente.value, paquete:paquete.value, calificacion:Number(calificacion.value), comentario:comentario.value, fecha:fecha.value};const id=registroId.value;const r=await fetch(id?API+'/'+id:API,{method:id?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(datos)});if(!r.ok)return alert('Error al guardar');limpiar();listar();});
cancelar.addEventListener('click',limpiar);
async function listar(){const r=await fetch(API);const datos=await r.json();tabla.innerHTML='';datos.forEach(d=>tabla.innerHTML+=`<tr><td>${d.cliente}</td><td>${d.paquete}</td><td>${d.calificacion}</td><td>${d.comentario}</td><td>${d.fecha}</td><td><button class="btn btn-warning btn-sm" onclick="editar('${d._id}')">Editar</button> <button class="btn btn-danger btn-sm" onclick="borrar('${d._id}')">Eliminar</button></td></tr>`);}
async function editar(id){const r=await fetch(API+'/'+id);const d=await r.json();registroId.value=d._id;cliente.value=d.cliente;
paquete.value=d.paquete;
calificacion.value=d.calificacion;
comentario.value=d.comentario;
fecha.value=d.fecha;guardar.textContent='Actualizar';}
async function borrar(id){if(!confirm('¿Eliminar registro?'))return;await fetch(API+'/'+id,{method:'DELETE'});listar();}
function limpiar(){form.reset();registroId.value='';guardar.textContent='Guardar';}
