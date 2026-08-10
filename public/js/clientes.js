const API_CLIENTES = '/api/clientes';

const formCliente =
    document.getElementById('formCliente');

const clienteId =
    document.getElementById('clienteId');

const nombre =
    document.getElementById('nombre');

const correo =
    document.getElementById('correo');

const telefono =
    document.getElementById('telefono');

const pais =
    document.getElementById('pais');

const edad =
    document.getElementById('edad');

const estado =
    document.getElementById('estado');

const tablaClientes =
    document.getElementById('tablaClientes');

const formTitulo =
    document.getElementById('formTitulo');

const btnGuardar =
    document.getElementById('btnGuardar');

const btnCancelar =
    document.getElementById('btnCancelar');

const alertContainer =
    document.getElementById('alertContainer');


// Al cargar la página
document.addEventListener(
    'DOMContentLoaded',
    obtenerClientes
);


// Guardar o actualizar
formCliente.addEventListener(
    'submit',
    function (e) {

        e.preventDefault();

        const datos = {

            nombre: nombre.value,

            correo: correo.value,

            telefono: telefono.value,

            pais: pais.value,

            edad: Number(edad.value),

            estado: estado.value

        };

        if (clienteId.value) {

            actualizarCliente(
                clienteId.value,
                datos
            );

        } else {

            crearCliente(datos);

        }

    }
);


// Cancelar edición
btnCancelar.addEventListener(
    'click',
    limpiarFormulario
);


// GET
async function obtenerClientes() {

    try {

        const respuesta =
            await fetch(API_CLIENTES);

        const clientes =
            await respuesta.json();

        mostrarClientes(clientes);

    } catch (error) {

        mostrarAlerta(
            'Error al obtener los clientes',
            'danger'
        );

    }

}


// POST
async function crearCliente(datos) {

    try {

        const respuesta =
            await fetch(
                API_CLIENTES,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify(datos)
                }
            );

        if (!respuesta.ok) {

            throw new Error(
                'Error al crear el cliente'
            );

        }

        mostrarAlerta(
            'Cliente creado correctamente',
            'success'
        );

        limpiarFormulario();

        obtenerClientes();

    } catch (error) {

        mostrarAlerta(
            error.message,
            'danger'
        );

    }

}


// GET por ID
async function cargarCliente(id) {

    try {

        const respuesta =
            await fetch(
                API_CLIENTES + '/' + id
            );

        const cliente =
            await respuesta.json();

        clienteId.value =
            cliente._id;

        nombre.value =
            cliente.nombre;

        correo.value =
            cliente.correo;

        telefono.value =
            cliente.telefono;

        pais.value =
            cliente.pais;

        edad.value =
            cliente.edad;

        estado.value =
            cliente.estado;

        formTitulo.textContent =
            'Editar Cliente';

        btnGuardar.textContent =
            'Actualizar';

    } catch (error) {

        mostrarAlerta(
            'Error al obtener el cliente',
            'danger'
        );

    }

}


// PUT
async function actualizarCliente(
    id,
    datos
) {

    try {

        const respuesta =
            await fetch(
                API_CLIENTES + '/' + id,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify(datos)
                }
            );

        if (!respuesta.ok) {

            throw new Error(
                'Error al actualizar el cliente'
            );

        }

        mostrarAlerta(
            'Cliente actualizado correctamente',
            'success'
        );

        limpiarFormulario();

        obtenerClientes();

    } catch (error) {

        mostrarAlerta(
            error.message,
            'danger'
        );

    }

}


// DELETE
async function eliminarCliente(id) {

    const confirmar =
        confirm(
            '¿Está seguro de eliminar este cliente?'
        );

    if (!confirmar) {

        return;

    }

    try {

        const respuesta =
            await fetch(
                API_CLIENTES + '/' + id,
                {
                    method: 'DELETE'
                }
            );

        if (!respuesta.ok) {

            throw new Error(
                'Error al eliminar el cliente'
            );

        }

        mostrarAlerta(
            'Cliente eliminado correctamente',
            'success'
        );

        obtenerClientes();

    } catch (error) {

        mostrarAlerta(
            error.message,
            'danger'
        );

    }

}


// Mostrar datos en tabla
function mostrarClientes(clientes) {

    tablaClientes.innerHTML = '';

    clientes.forEach(
        function (cliente) {

            tablaClientes.innerHTML += `

                <tr>

                    <td>
                        ${cliente.nombre}
                    </td>

                    <td>
                        ${cliente.correo}
                    </td>

                    <td>
                        ${cliente.telefono}
                    </td>

                    <td>
                        ${cliente.pais}
                    </td>

                    <td>
                        ${cliente.edad}
                    </td>

                    <td>
                        ${cliente.estado}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="cargarCliente('${cliente._id}')">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarCliente('${cliente._id}')">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


// Limpiar formulario
function limpiarFormulario() {

    formCliente.reset();

    clienteId.value = '';

    formTitulo.textContent =
        'Nuevo Cliente';

    btnGuardar.textContent =
        'Guardar';

}


// Alerta Bootstrap
function mostrarAlerta(
    mensaje,
    tipo
) {

    alertContainer.innerHTML = `

        <div
            class="alert alert-${tipo}"
            role="alert">

            ${mensaje}

        </div>

    `;

}