document.addEventListener(
    'DOMContentLoaded',
    function () {

        cargarContadores();

    }
);


async function cargarContadores() {

    await obtenerCantidad(
        '/api/clientes',
        'contadorClientes'
    );

    await obtenerCantidad(
        '/api/reservaciones',
        'contadorReservaciones'
    );

    await obtenerCantidad(
        '/api/pagos',
        'contadorPagos'
    );

    await obtenerCantidad(
        '/api/paquetes',
        'contadorPaquetes'
    );

    await obtenerCantidad(
        '/api/destinos',
        'contadorDestinos'
    );

    await obtenerCantidad(
        '/api/naves',
        'contadorNaves'
    );

}


async function obtenerCantidad(
    url,
    elementoId
) {

    const elemento =
        document.getElementById(
            elementoId
        );

    try {

        const respuesta =
            await fetch(url);

        if (!respuesta.ok) {

            throw new Error(
                'Error en la petición'
            );

        }

        const datos =
            await respuesta.json();

        elemento.textContent =
            datos.length;

    } catch (error) {

        console.error(
            'Error cargando ' + url,
            error
        );

        elemento.textContent = '0';

    }

}