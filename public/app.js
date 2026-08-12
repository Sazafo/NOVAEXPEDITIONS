// URL base de la API (Persona 1 - Backend)
const API_URL = '/api/paquetes';

// Elementos del DOM
const formPaquete = document.getElementById('formPaquete');
const paqueteId = document.getElementById('paqueteId');
const nombre = document.getElementById('nombre');
const destino = document.getElementById('destino');
const duracionDias = document.getElementById('duracionDias');
const precio = document.getElementById('precio');
const estado = document.getElementById('estado');
const incluye = document.getElementById('incluye');
const pilotoRoutes = require('./routes/pilotoRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const seguroRoutes = require('./routes/seguroRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const opinionRoutes = require('./routes/opinionRoutes');

const tablaPaquetes = document.getElementById('tablaPaquetes');
const formTitulo = document.getElementById('formTitulo');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const alertContainer = document.getElementById('alertContainer');
const tituloLista = document.getElementById('tituloLista');
const linkPaquetes = document.getElementById('linkPaquetes');
const linkInicio = document.getElementById('linkInicio');
const seccionFormulario = document.getElementById('seccionFormulario');

// Guarda todos los paquetes obtenidos del backend
let todosLosPaquetes = [];

// Cantidad de paquetes a mostrar en la vista "recientes"
const CANTIDAD_RECIENTES = 5;

// Controla qué vista está activa: 'recientes' o 'todos'
let vistaActual = 'recientes';

// Al cargar la página, se obtienen los paquetes
document.addEventListener('DOMContentLoaded', obtenerPaquetes);

// Envío del formulario (crear o actualizar)
formPaquete.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = {
        nombre: nombre.value.trim(),
        destino: destino.value.trim(),
        duracionDias: Number(duracionDias.value),
        precio: Number(precio.value),
        incluye: incluye.value
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item.length > 0),
        estado: estado.value
    };

    if (paqueteId.value) {
        actualizarPaquete(paqueteId.value, datos);
    } else {
        crearPaquete(datos);
    }
});

// Botón cancelar edición
btnCancelar.addEventListener('click', limpiarFormulario);

// Click en "Paquetes" del navbar -> mostrar todos los paquetes
linkPaquetes.addEventListener('click', (e) => {
    e.preventDefault();
    vistaActual = 'todos';
    aplicarVista();
});

// Click en "Nova Expeditions" (inicio) -> volver a la vista principal
linkInicio.addEventListener('click', (e) => {
    e.preventDefault();
    vistaActual = 'recientes';
    aplicarVista();
});

// Obtener todos los paquetes (GET /api/paquetes)
async function obtenerPaquetes() {
    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error('Error al obtener los paquetes');
        }

        const paquetes = await respuesta.json();
        todosLosPaquetes = paquetes;
        aplicarVista();
    } catch (error) {
        mostrarAlerta(error.message, 'danger');
    }
}

// Crear un paquete (POST /api/paquetes)
async function crearPaquete(datos) {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el paquete');
        }

        mostrarAlerta('Paquete creado correctamente', 'success');
        limpiarFormulario();
        obtenerPaquetes();
    } catch (error) {
        mostrarAlerta(error.message, 'danger');
    }
}

// Actualizar un paquete (PUT /api/paquetes/:id)
async function actualizarPaquete(id, datos) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error('Error al actualizar el paquete');
        }

        mostrarAlerta('Paquete actualizado correctamente', 'success');
        limpiarFormulario();
        obtenerPaquetes();
    } catch (error) {
        mostrarAlerta(error.message, 'danger');
    }
}

// Eliminar un paquete (DELETE /api/paquetes/:id)
async function eliminarPaquete(id) {
    const confirmar = confirm(
        '¿Está seguro de que desea eliminar este paquete?'
    );

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error('Error al eliminar el paquete');
        }

        mostrarAlerta('Paquete eliminado correctamente', 'success');
        obtenerPaquetes();
    } catch (error) {
        mostrarAlerta(error.message, 'danger');
    }
}

// Cargar los datos de un paquete en el formulario para editarlo
async function cargarPaquete(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error('Error al obtener el paquete');
        }

        const paquete = await respuesta.json();

        paqueteId.value = paquete._id;
        nombre.value = paquete.nombre;
        destino.value = paquete.destino;
        duracionDias.value = paquete.duracionDias;
        precio.value = paquete.precio;
        estado.value = paquete.estado;
        incluye.value = paquete.incluye.join(', ');

        formTitulo.textContent = 'Editar Paquete';
        btnGuardar.textContent = 'Actualizar';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        mostrarAlerta(error.message, 'danger');
    }
}

// Decide qué paquetes mostrar según la vista activa (recientes o todos)
function aplicarVista() {
    if (vistaActual === 'todos') {
        seccionFormulario.style.display = 'none';
        tituloLista.textContent = 'Todos los Paquetes';
        renderizarTabla(todosLosPaquetes);
    } else {
        seccionFormulario.style.display = 'block';
        tituloLista.textContent = 'Paquetes Recientes';

        // Se muestran los últimos paquetes creados (más reciente primero)
        const recientes = todosLosPaquetes
            .slice(-CANTIDAD_RECIENTES)
            .reverse();

        renderizarTabla(recientes);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar la tabla de paquetes
function renderizarTabla(paquetes) {
    tablaPaquetes.innerHTML = '';

    if (paquetes.length === 0) {
        tablaPaquetes.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    No hay paquetes registrados
                </td>
            </tr>
        `;
        return;
    }

    paquetes.forEach((paquete) => {
        const badgeClase =
            paquete.estado === 'Activo' ? 'badge-activo' : 'badge-inactivo';

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${paquete.nombre}</td>
            <td>${paquete.destino}</td>
            <td>${paquete.duracionDias} días</td>
            <td>$${paquete.precio.toFixed(2)}</td>
            <td>${paquete.incluye.join(', ')}</td>
            <td>
                <span class="badge ${badgeClase}">
                    ${paquete.estado}
                </span>
            </td>
            <td>
                <button
                    class="btn btn-sm btn-warning btn-accion"
                    onclick="cargarPaquete('${paquete._id}')">
                    Editar
                </button>
                <button
                    class="btn btn-sm btn-danger btn-accion"
                    onclick="eliminarPaquete('${paquete._id}')">
                    Eliminar
                </button>
            </td>
        `;

        tablaPaquetes.appendChild(fila);
    });
}

// Limpiar y reiniciar el formulario
function limpiarFormulario() {
    formPaquete.reset();
    paqueteId.value = '';
    formTitulo.textContent = 'Nuevo Paquete';
    btnGuardar.textContent = 'Guardar';
}

// Mostrar una alerta de Bootstrap
function mostrarAlerta(mensaje, tipo) {
    alertContainer.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"></button>
        </div>
    `;
}


app.use('/api/pilotos', pilotoRoutes);
app.use('/api/hoteles', hotelRoutes);
app.use('/api/seguros', seguroRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/opiniones', opinionRoutes);