const API='/api/pilotos';const form=document.getElementById('form');const registroId=document.getElementById('registroId');const tabla=document.getElementById('tabla');const guardar=document.getElementById('guardar');const cancelar=document.getElementById('cancelar');
const nombre=document.getElementById('nombre');
const licencia=document.getElementById('licencia');
const experienciaAnios=document.getElementById('experienciaAnios');
const especialidad=document.getElementById('especialidad');
const estado=document.getElementById('estado');
document.addEventListener('DOMContentLoaded',listar);
form.addEventListener('submit',async e=>{e.preventDefault();const datos={nombre:nombre.value, licencia:licencia.value, experienciaAnios:Number(experienciaAnios.value), especialidad:especialidad.value, estado:estado.value};const id=registroId.value;const r=await fetch(id?API+'/'+id:API,{method:id?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(datos)});if(!r.ok)return alert('Error al guardar');limpiar();listar();});
cancelar.addEventListener('click',limpiar);
async function listar(){const r=await fetch(API);const datos=await r.json();tabla.innerHTML='';datos.forEach(d=>tabla.innerHTML+=`<tr><td>${d.nombre}</td><td>${d.licencia}</td><td>${d.experienciaAnios}</td><td>${d.especialidad}</td><td>${d.estado}</td><td><button class="btn btn-warning btn-sm" onclick="editar('${d._id}')">Editar</button> <button class="btn btn-danger btn-sm" onclick="borrar('${d._id}')">Eliminar</button></td></tr>`);}
async function editar(id){const r=await fetch(API+'/'+id);const d=await r.json();registroId.value=d._id;nombre.value=d.nombre;
licencia.value=d.licencia;
experienciaAnios.value=d.experienciaAnios;
especialidad.value=d.especialidad;
estado.value=d.estado;guardar.textContent='Actualizar';}
async function borrar(id){if(!confirm('¿Eliminar registro?'))return;await fetch(API+'/'+id,{method:'DELETE'});listar();}
function limpiar(){form.reset();registroId.value='';guardar.textContent='Guardar';}
