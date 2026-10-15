import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js';

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
    try {
        const { clientName, date } = req.body;

        if (!clientName || !date) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios. Se requiere: clientName y date.'
            });
        }

        const createdBooking = await bookingManager.addBooking(req.body);
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const id = parseInt(req.params.bid);
        const booking = await bookingManager.getBookingById(id);

        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.bid);
        const serviceId = parseInt(req.params.sid);

    
        const serviceExists = await serviceManager.getServiceById(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ error: 'El servicio que intentas agregar no existe' });
        }

        const updatedBooking = await bookingManager.addServiceToBooking(bookingId, serviceId);
        
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el servicio a la reserva' });
    }
};