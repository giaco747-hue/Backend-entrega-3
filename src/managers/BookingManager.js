import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/bookings.json'); 

export default class BookingManager {
    async #readData() {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    async #writeData(data) {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    }

    async getBookingById(id) {
        const bookings = await this.#readData();
        const booking = bookings.find(b => b.id === id);
        return booking || null; 
    }

    async createBooking(bookingData) {
        const bookings = await this.#readData();
        const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;

        const newBooking = {
            id: newId,
            clientName: bookingData.clientName,
            clientEmail: bookingData.clientEmail,
            date: bookingData.date,
            time: bookingData.time,
            status: bookingData.status || 'pending',
            services: [] 
        };

        bookings.push(newBooking);
        await this.#writeData(bookings);
        return newBooking;
    }

    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.#readData();
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);

        if (bookingIndex === -1) return null; 

        const booking = bookings[bookingIndex];
        
        const existingServiceIndex = booking.services.findIndex(s => s.service === serviceId);

        if (existingServiceIndex !== -1) {
            booking.services[existingServiceIndex].quantity += 1;
        } else {
            booking.services.push({ service: serviceId, quantity: 1 });
        }

        bookings[bookingIndex] = booking;
        await this.#writeData(bookings);
        return booking;
    }
}