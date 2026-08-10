const API_PAGOS =
    '/api/pagos';

const API_CLIENTES =
    '/api/clientes';

const API_RESERVACIONES =
    '/api/reservaciones';


const formPago =
    document.getElementById('formPago');

const pagoId =
    document.getElementById('pagoId');

const cliente =
    document.getElementById('cliente');

const reservacion =
    document.getElementById('reservacion');

const monto =
    document.getElementById('monto');

const metodoPago =
    document.getElementById('metodoPago');

const fechaPago =
    document.getElementById('fechaPago');

const estado =
    document.getElementById('estado');

const tablaPagos =
    document.getElementById('tablaPagos');

const formTitulo =
    document.getElementById('formTitulo');

const btnGuardar =
    document.getElementById('btnGuardar');

const btnCancelar =
    document.getElementById('btnCancelar');

const alertContainer =
    document.getElementById('alertContainer');


let todasLasReservaciones = [];


// ===============================
// CARGA INICIAL
// ===============================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        obtenerPagos();
        obtenerClientes();
        cargarReservaciones();

    }
);


// ===============================
// GUARDAR O ACTUALIZAR
// ===============================

formPago.addEventListener(
    'submit',
    function (e) {

        e.preventDefault();

        const datos = {

            cliente:
                cliente.value,

            reservacion:
                reservacion.value,

            monto:
                Number(monto.value),

            metodoPago:
                metodoPago.value,

            fechaPago:
                fechaPago.value,

            estado:
                estado.value

        };

        if (pagoId.value) {

            actualizarPago(
                pagoId.value,
                datos
            );

        } else {

            crearPago(datos);

        }

    }
);


btnCancelar.addEventListener(
    'click',
    limpiarFormulario
);


// ===============================
// OBTENER CLIENTES
// ===============================

async function obtenerClientes() {

    try {

        const respuesta =
            await fetch(
                API_CLIENTES
            );

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
// CARGAR TODAS LAS RESERVACIONES
// ===============================

async function cargarReservaciones() {

    try {

        const respuesta =
            await fetch(
                API_RESERVACIONES
            );

        todasLasReservaciones =
            await respuesta.json();

    } catch (error) {

        mostrarAlerta(
            'Error al cargar las reservaciones',
            'danger'
        );

    }

}


// ===============================
// CLIENTE SELECCIONADO
// ===============================

cliente.addEventListener(
    'change',
    function () {

        mostrarReservacionesCliente(
            cliente.value
        );

    }
);


function mostrarReservacionesCliente(
    nombreCliente
) {

    reservacion.innerHTML =
        '<option value="">Seleccione una reservación</option>';

    monto.value = '';

    const filtradas =
        todasLasReservaciones.filter(
            function (item) {

                return (
                    item.cliente ===
                    nombreCliente
                );

            }
        );

    filtradas.forEach(
        function (item) {

            const texto =
                item.paquete +
                ' - ' +
                item.fechaReserva;

            reservacion.innerHTML += `

                <option
                    value="${texto}"
                    data-total="${item.total}">

                    ${texto}

                </option>

            `;

        }
    );

}


// ===============================
// RESERVACIÓN SELECCIONADA
// ===============================

reservacion.addEventListener(
    'change',
    function () {

        const opcion =
            reservacion.options[
                reservacion.selectedIndex
            ];

        const totalReserva =
            opcion.getAttribute(
                'data-total'
            );

        if (totalReserva) {

            monto.value =
                totalReserva;

        } else {

            monto.value = '';

        }

    }
);


// ===============================
// GET PAGOS
// ===============================

async function obtenerPagos() {

    try {

        const respuesta =
            await fetch(
                API_PAGOS
            );

        const pagos =
            await respuesta.json();

        mostrarPagos(
            pagos
        );

    } catch (error) {

        mostrarAlerta(
            'Error al obtener los pagos',
            'danger'
        );

    }

}


// ===============================
// POST
// ===============================

async function crearPago(datos) {

    try {

        const respuesta =
            await fetch(
                API_PAGOS,
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
                'Error al crear el pago'
            );

        }

        mostrarAlerta(
            'Pago creado correctamente',
            'success'
        );

        limpiarFormulario();

        obtenerPagos();

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

async function cargarPago(id) {

    try {

        const respuesta =
            await fetch(
                API_PAGOS +
                '/' +
                id
            );

        const pago =
            await respuesta.json();

        pagoId.value =
            pago._id;

        cliente.value =
            pago.cliente;

        mostrarReservacionesCliente(
            pago.cliente
        );

        reservacion.value =
            pago.reservacion;

        monto.value =
            pago.monto;

        metodoPago.value =
            pago.metodoPago;

        fechaPago.value =
            pago.fechaPago;

        estado.value =
            pago.estado;

        formTitulo.textContent =
            'Editar Pago';

        btnGuardar.textContent =
            'Actualizar';

    } catch (error) {

        mostrarAlerta(
            'Error al obtener el pago',
            'danger'
        );

    }

}


// ===============================
// PUT
// ===============================

async function actualizarPago(
    id,
    datos
) {

    try {

        const respuesta =
            await fetch(
                API_PAGOS +
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
                'Error al actualizar el pago'
            );

        }

        mostrarAlerta(
            'Pago actualizado correctamente',
            'success'
        );

        limpiarFormulario();

        obtenerPagos();

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

async function eliminarPago(id) {

    const confirmar =
        confirm(
            '¿Está seguro de eliminar este pago?'
        );

    if (!confirmar) {

        return;

    }

    try {

        const respuesta =
            await fetch(
                API_PAGOS +
                '/' +
                id,
                {
                    method: 'DELETE'
                }
            );

        if (!respuesta.ok) {

            throw new Error(
                'Error al eliminar el pago'
            );

        }

        mostrarAlerta(
            'Pago eliminado correctamente',
            'success'
        );

        obtenerPagos();

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

function mostrarPagos(pagos) {

    tablaPagos.innerHTML = '';

    pagos.forEach(
        function (pago) {

            tablaPagos.innerHTML += `

                <tr>

                    <td>
                        ${pago.cliente}
                    </td>

                    <td>
                        ${pago.reservacion}
                    </td>

                    <td>
                        $${pago.monto}
                    </td>

                    <td>
                        ${pago.metodoPago}
                    </td>

                    <td>
                        ${pago.fechaPago}
                    </td>

                    <td>
                        ${pago.estado}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="cargarPago('${pago._id}')">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarPago('${pago._id}')">

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

    formPago.reset();

    pagoId.value = '';

    reservacion.innerHTML =
        '<option value="">Primero seleccione un cliente</option>';

    monto.value = '';

    formTitulo.textContent =
        'Nuevo Pago';

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