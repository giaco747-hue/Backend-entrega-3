import { Router } from 'express';
import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js'; 

const router = Router();
const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

router.get('/:bid', async (req, res) => {
    try {
        const id = parseInt(req.params.bid);
        const booking = await bookingManager.getBookingById(id);

        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { clientName, clientEmail, date, time } = req.body;

        if (!clientName || !clientEmail || !date || !time) {
            return res.status(400).json({ 
                error: 'Faltan campos. Se requiere: clientName, clientEmail, date y time.' 
            });
        }

        const newBooking = await bookingManager.createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
});

router.post('/:bid/services/:sid', async (req, res) => {
    try {
        const bookingId = parseInt(req.params.bid);
        const serviceId = parseInt(req.params.sid);

        const bookingExists = await bookingManager.getBookingById(bookingId);
        if (!bookingExists) {
            return res.status(404).json({ error: `La reserva con ID ${bookingId} no existe` });
        }

        const serviceExists = await serviceManager.getServiceById(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ error: `El servicio con ID ${serviceId} no existe` });
        }

        const updatedBooking = await bookingManager.addServiceToBooking(bookingId, serviceId);
        res.status(200).json(updatedBooking);

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el servicio a la reserva' });
    }
});

export default router;