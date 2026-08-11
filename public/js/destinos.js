const API_URL='/api/destinos';
const form=document.getElementById('formDestino');
const idCampo=document.getElementById('destinoId');
const nombre=document.getElementById('nombre');
const ubicacion=document.getElementById('ubicacion');
const descripcion=document.getElementById('descripcion');
const estado=document.getElementById('estado');
const tabla=document.getElementById('tablaDestinos');
const btnGuardar=document.getElementById('btnGuardar');
const btnCancelar=document.getElementById('btnCancelar');
const alertContainer=document.getElementById('alertContainer');

document.addEventListener('DOMContentLoaded', obtenerDatos);

form.addEventListener('submit', function(e){
    e.preventDefault();
    const datos={ nombre: nombre.value, ubicacion: ubicacion.value, descripcion: descripcion.value, estado: estado.value };
    if(idCampo.value) actualizarDato(idCampo.value, datos);
    else crearDato(datos);
});

btnCancelar.addEventListener('click', limpiarFormulario);

async function obtenerDatos(){
    const respuesta=await fetch(API_URL);
    const datos=await respuesta.json();
    mostrarDatos(datos);
}

async function crearDato(datos){
    const respuesta=await fetch(API_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(datos)
    });
    if(!respuesta.ok) return alert('Error al guardar');
    limpiarFormulario();
    obtenerDatos();
}

async function cargarDato(id){
    const respuesta=await fetch(API_URL+'/'+id);
    const dato=await respuesta.json();
    idCampo.value=dato._id;
        nombre.value=dato.nombre;
        ubicacion.value=dato.ubicacion;
        descripcion.value=dato.descripcion;
        estado.value=dato.estado;
    btnGuardar.textContent='Actualizar';
}

async function actualizarDato(id,datos){
    const respuesta=await fetch(API_URL+'/'+id,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(datos)
    });
    if(!respuesta.ok) return alert('Error al actualizar');
    limpiarFormulario();
    obtenerDatos();
}

async function eliminarDato(id){
    if(!confirm('¿Está seguro de eliminar este registro?')) return;
    const respuesta=await fetch(API_URL+'/'+id,{method:'DELETE'});
    if(!respuesta.ok) return alert('Error al eliminar');
    obtenerDatos();
}

function mostrarDatos(datos){
    tabla.innerHTML='';
    datos.forEach(function(dato){
        tabla.innerHTML+=`<tr><td>${dato.nombre}</td><td>${dato.ubicacion}</td><td>${dato.descripcion}</td><td>${dato.estado}</td><td>
        <button class="btn btn-warning btn-sm" onclick="cargarDato('${dato._id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarDato('${dato._id}')">Eliminar</button>
        </td></tr>`;
    });
}

function limpiarFormulario(){
    form.reset();
    idCampo.value='';
    btnGuardar.textContent='Guardar';
}
