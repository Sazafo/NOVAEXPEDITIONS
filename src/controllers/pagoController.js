const pagoService =
    require('../services/pagoService');

const obtenerPagos = async (req, res) => {
    try {

        const pagos =
            await pagoService.obtenerPagos();

        res.json(pagos);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los pagos'
        });

    }
};

const obtenerPagoPorId = async (req, res) => {
    try {

        const pago =
            await pagoService.obtenerPagoPorId(
                req.params.id
            );

        if (!pago) {
            return res.status(404).json({
                mensaje: 'Pago no encontrado'
            });
        }

        res.json(pago);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener el pago'
        });

    }
};

const agregarPago = async (req, res) => {
    try {

        const nuevoPago =
            await pagoService.agregarPago(
                req.body
            );

        res.status(201).json(nuevoPago);

    } catch (error) {

        res.status(400).json({
            mensaje: 'Error al agregar el pago',
            error: error.message
        });

    }
};

const actualizarPago = async (req, res) => {
    try {

        const pagoActualizado =
            await pagoService.actualizarPago(
                req.params.id,
                req.body
            );

        if (!pagoActualizado) {
            return res.status(404).json({
                mensaje: 'Pago no encontrado'
            });
        }

        res.json(pagoActualizado);

    } catch (error) {

        res.status(400).json({
            mensaje: 'Error al actualizar el pago',
            error: error.message
        });

    }
};

const eliminarPago = async (req, res) => {
    try {

        const pagoEliminado =
            await pagoService.eliminarPago(
                req.params.id
            );

        if (!pagoEliminado) {
            return res.status(404).json({
                mensaje: 'Pago no encontrado'
            });
        }

        res.json({
            mensaje: 'Pago eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el pago'
        });

    }
};

module.exports = {
    obtenerPagos,
    obtenerPagoPorId,
    agregarPago,
    actualizarPago,
    eliminarPago
};