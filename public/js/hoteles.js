const API='/api/hoteles';const form=document.getElementById('form');const registroId=document.getElementById('registroId');const tabla=document.getElementById('tabla');const guardar=document.getElementById('guardar');const cancelar=document.getElementById('cancelar');
const nombre=document.getElementById('nombre');
const ubicacion=document.getElementById('ubicacion');
const capacidad=document.getElementById('capacidad');
const precioNoche=document.getElementById('precioNoche');
const estado=document.getElementById('estado');
document.addEventListener('DOMContentLoaded',listar);
form.addEventListener('submit',async e=>{e.preventDefault();const datos={nombre:nombre.value, ubicacion:ubicacion.value, capacidad:Number(capacidad.value), precioNoche:Number(precioNoche.value), estado:estado.value};const id=registroId.value;const r=await fetch(id?API+'/'+id:API,{method:id?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(datos)});if(!r.ok)return alert('Error al guardar');limpiar();listar();});
cancelar.addEventListener('click',limpiar);
async function listar(){const r=await fetch(API);const datos=await r.json();tabla.innerHTML='';datos.forEach(d=>tabla.innerHTML+=`<tr><td>${d.nombre}</td><td>${d.ubicacion}</td><td>${d.capacidad}</td><td>${d.precioNoche}</td><td>${d.estado}</td><td><button class="btn btn-warning btn-sm" onclick="editar('${d._id}')">Editar</button> <button class="btn btn-danger btn-sm" onclick="borrar('${d._id}')">Eliminar</button></td></tr>`);}
async function editar(id){const r=await fetch(API+'/'+id);const d=await r.json();registroId.value=d._id;nombre.value=d.nombre;
ubicacion.value=d.ubicacion;
capacidad.value=d.capacidad;
precioNoche.value=d.precioNoche;
estado.value=d.estado;guardar.textContent='Actualizar';}
async function borrar(id){if(!confirm('¿Eliminar registro?'))return;await fetch(API+'/'+id,{method:'DELETE'});listar();}
function limpiar(){form.reset();registroId.value='';guardar.textContent='Guardar';}
