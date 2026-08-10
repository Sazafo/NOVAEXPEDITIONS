const reservacionService =
    require('../services/reservacionService');

const obtenerReservaciones = async (req, res) => {
    try {

        const reservaciones =
            await reservacionService.obtenerReservaciones();

        res.json(reservaciones);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener las reservaciones'
        });

    }
};

const obtenerReservacionPorId = async (req, res) => {
    try {

        const reservacion =
            await reservacionService.obtenerReservacionPorId(
                req.params.id
            );

        if (!reservacion) {
            return res.status(404).json({
                mensaje: 'Reservación no encontrada'
            });
        }

        res.json(reservacion);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener la reservación'
        });

    }
};

const agregarReservacion = async (req, res) => {
    try {

        const nuevaReservacion =
            await reservacionService.agregarReservacion(
                req.body
            );

        res.status(201).json(nuevaReservacion);

    } catch (error) {

        res.status(400).json({
            mensaje: 'Error al agregar la reservación',
            error: error.message
        });

    }
};

const actualizarReservacion = async (req, res) => {
    try {

        const reservacionActualizada =
            await reservacionService.actualizarReservacion(
                req.params.id,
                req.body
            );

        if (!reservacionActualizada) {
            return res.status(404).json({
                mensaje: 'Reservación no encontrada'
            });
        }

        res.json(reservacionActualizada);

    } catch (error) {

        res.status(400).json({
            mensaje: 'Error al actualizar la reservación',
            error: error.message
        });

    }
};

const eliminarReservacion = async (req, res) => {
    try {

        const reservacionEliminada =
            await reservacionService.eliminarReservacion(
                req.params.id
            );

        if (!reservacionEliminada) {
            return res.status(404).json({
                mensaje: 'Reservación no encontrada'
            });
        }

        res.json({
            mensaje: 'Reservación eliminada correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar la reservación'
        });

    }
};

module.exports = {
    obtenerReservaciones,
    obtenerReservacionPorId,
    agregarReservacion,
    actualizarReservacion,
    eliminarReservacion
};