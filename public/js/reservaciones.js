const API_RESERVACIONES = '/api/reservaciones';
const API_CLIENTES = '/api/clientes';
const API_PAQUETES = '/api/paquetes';

const formReservacion =
    document.getElementById('formReservacion');

const reservacionId =
    document.getElementById('reservacionId');

const cliente =
    document.getElementById('cliente');

const paquete =
    document.getElementById('paquete');

const fechaReserva =
    document.getElementById('fechaReserva');

const cantidadPersonas =
    document.getElementById('cantidadPersonas');

const total =
    document.getElementById('total');

const estado =
    document.getElementById('estado');

const tablaReservaciones =
    document.getElementById('tablaReservaciones');

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
    function () {

        obtenerReservaciones();
        obtenerClientes();
        obtenerPaquetes();

    }
);


// Guardar o actualizar
formReservacion.addEventListener(
    'submit',
    function (e) {

        e.preventDefault();

        const datos = {

            cliente: cliente.value,

            paquete: paquete.value,

            fechaReserva: fechaReserva.value,

            cantidadPersonas:
                Number(cantidadPersonas.value),

            total:
                Number(total.value),

            estado:
                estado.value

        };

        if (reservacionId.value) {

            actualizarReservacion(
                reservacionId.value,
                datos
            );

        } else {

            crearReservacion(datos);

        }

    }
);


// Cancelar
btnCancelar.addEventListener(
    'click',
    limpiarFormulario
);


// ===============================
// CARGAR CLIENTES
// ===============================

async function obtenerClientes() {

    try {

        const respuesta =
            await fetch(API_CLIENTES);

        const clientes =
            await respuesta.json();

        cliente.innerHTML =
            '<option value="">Seleccione un cliente</option>';

        clientes.forEach(
            function (item) {

                cliente.innerHTML += `

                    <option value="${item.nombre}">
                        ${item.nombre}
                    </option>

                `;

            }
        );

    } catch (error) {

        mostrarAlerta(
            'Error al cargar los clientes',
            'danger'
        );

    }

}


// ===============================
// CARGAR PAQUETES
// ===============================

async function obtenerPaquetes() {

    try {

        const respuesta =
            await fetch(API_PAQUETES);

        const paquetes =
            await respuesta.json();

        paquete.innerHTML =
            '<option value="">Seleccione un paquete</option>';

        paquetes.forEach(
            function (item) {

                paquete.innerHTML += `

                    <option
                        value="${item.nombre}"
                        data-precio="${item.precio}">

                        ${item.nombre}
                        - ${item.destino}

                    </option>

                `;

            }
        );

    } catch (error) {

        mostrarAlerta(
            'Error al cargar los paquetes',
            'danger'
        );

    }

}


// ===============================
// CALCULAR TOTAL
// ===============================

paquete.addEventListener(
    'change',
    calcularTotal
);

cantidadPersonas.addEventListener(
    'input',
    calcularTotal
);


function calcularTotal() {

    const opcion =
        paquete.options[
            paquete.selectedIndex
        ];

    const precio =
        Number(
            opcion.getAttribute(
                'data-precio'
            )
        );

    const personas =
        Number(
            cantidadPersonas.value
        );

    if (
        precio > 0 &&
        personas > 0
    ) {

        total.value =
            precio * personas;

    }

}


// ===============================
// GET RESERVACIONES
// ===============================

async function obtenerReservaciones() {

    try {

        const respuesta =
            await fetch(
                API_RESERVACIONES
            );

        const reservaciones =
            await respuesta.json();

        mostrarReservaciones(
            reservaciones
        );

    } catch (error) {

        mostrarAlerta(
            'Error al obtener las reservaciones',
            'danger'
        );

    }

}


// ===============================
// POST
// ===============================

async function crearReservacion(
    datos
) {

    try {

        const respuesta =
            await fetch(
                API_RESERVACIONES,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify(
                            datos
                        )
                }
            );

        if (!respuesta.ok) {

            throw new Error(
                'Error al crear la reservación'
            );

        }

        mostrarAlerta(
            'Reservación creada correctamente',
            'success'
        );

        limpiarFormulario();

        obtenerReservaciones();

    } catch (error) {

        mostrarAlerta(
            error.message,
            'danger'
        );

    }

}


// ===============================
// GET POR ID
// ===============================

async function cargarReservacion(
    id
) {

    try {

        const respuesta =
            await fetch(
                API_RESERVACIONES +
                '/' +
                id
            );

        const reservacion =
            await respuesta.json();

        reservacionId.value =
            reservacion._id;

        cliente.value =
            reservacion.cliente;

        paquete.value =
            reservacion.paquete;

        fechaReserva.value =
            reservacion.fechaReserva;

        cantidadPersonas.value =
            reservacion.cantidadPersonas;

        total.value =
            reservacion.total;

        estado.value =
            reservacion.estado;

        formTitulo.textContent =
            'Editar Reservación';

        btnGuardar.textContent =
            'Actualizar';

    } catch (error) {

        mostrarAlerta(
            'Error al obtener la reservación',
            'danger'
        );

    }

}


// ===============================
// PUT
// ===============================

async function actualizarReservacion(
    id,
    datos
) {

    try {

        const respuesta =
            await fetch(
                API_RESERVACIONES +
                '/' +
                id,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify(
                            datos
                        )
                }
            );

        if (!respuesta.ok) {

            throw new Error(
                'Error al actualizar la reservación'
            );

        }

        mostrarAlerta(
            'Reservación actualizada correctamente',
            'success'
        );

        limpiarFormulario();

        obtenerReservaciones();

    } catch (error) {

        mostrarAlerta(
            error.message,
            'danger'
        );

    }

}


// ===============================
// DELETE
// ===============================

async function eliminarReservacion(
    id
) {

    const confirmar =
        confirm(
            '¿Está seguro de eliminar esta reservación?'
        );

    if (!confirmar) {

        return;

    }

    try {

        const respuesta =
            await fetch(
                API_RESERVACIONES +
                '/' +
                id,
                {
                    method: 'DELETE'
                }
            );

        if (!respuesta.ok) {

            throw new Error(
                'Error al eliminar la reservación'
            );

        }

        mostrarAlerta(
            'Reservación eliminada correctamente',
            'success'
        );

        obtenerReservaciones();

    } catch (error) {

        mostrarAlerta(
            error.message,
            'danger'
        );

    }

}


// ===============================
// TABLA
// ===============================

function mostrarReservaciones(
    reservaciones
) {

    tablaReservaciones.innerHTML =
        '';

    reservaciones.forEach(
        function (reservacion) {

            tablaReservaciones.innerHTML += `

                <tr>

                    <td>
                        ${reservacion.cliente}
                    </td>

                    <td>
                        ${reservacion.paquete}
                    </td>

                    <td>
                        ${reservacion.fechaReserva}
                    </td>

                    <td>
                        ${reservacion.cantidadPersonas}
                    </td>

                    <td>
                        $${reservacion.total}
                    </td>

                    <td>
                        ${reservacion.estado}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="cargarReservacion('${reservacion._id}')">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarReservacion('${reservacion._id}')">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


// ===============================
// LIMPIAR
// ===============================

function limpiarFormulario() {

    formReservacion.reset();

    reservacionId.value = '';

    total.value = '';

    formTitulo.textContent =
        'Nueva Reservación';

    btnGuardar.textContent =
        'Guardar';

}


// ===============================
// ALERTA
// ===============================

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