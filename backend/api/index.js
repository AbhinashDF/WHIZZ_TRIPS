"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const zod_1 = require("zod");
const schema_1 = require("../shared/schema");
const storage_1 = require("../storage");
async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    const { url } = req;
    const path = url?.replace('/api', '') || '';
    try {
        // Destinations API
        if (path === '/destinations' && req.method === 'GET') {
            const destinations = await storage_1.storage.getAllDestinations();
            return res.json(destinations);
        }
        if (path.startsWith('/destinations/') && req.method === 'GET') {
            const id = path.split('/')[2];
            const destination = await storage_1.storage.getDestination(id);
            if (!destination) {
                return res.status(404).json({ message: 'Destination not found' });
            }
            return res.json(destination);
        }
        // Trip packages API
        if (path === '/trip-packages' && req.method === 'GET') {
            const category = req.query.category;
            const packages = await storage_1.storage.getTripPackagesByCategory(category);
            return res.json(packages);
        }
        if (path.startsWith('/trip-packages/') && req.method === 'GET') {
            const id = path.split('/')[2];
            const tripPackage = await storage_1.storage.getTripPackage(id);
            if (!tripPackage) {
                return res.status(404).json({ message: 'Trip package not found' });
            }
            return res.json(tripPackage);
        }
        // Bookings API
        if (path === '/bookings' && req.method === 'POST') {
            const bookingData = schema_1.insertBookingSchema.parse(req.body);
            const booking = await storage_1.storage.createBooking(bookingData);
            return res.status(201).json(booking);
        }
        if (path.startsWith('/bookings/') && req.method === 'GET') {
            const id = path.split('/')[2];
            const booking = await storage_1.storage.getBooking(id);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            return res.json(booking);
        }
        if (path.startsWith('/bookings/') && path.endsWith('/status') && req.method === 'PATCH') {
            const id = path.split('/')[2];
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ message: 'Status is required' });
            }
            const booking = await storage_1.storage.updateBookingStatus(id, status);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            return res.json(booking);
        }
        // Contact form API
        if (path === '/contacts' && req.method === 'POST') {
            const contactData = schema_1.insertContactSchema.parse(req.body);
            const contact = await storage_1.storage.createContact(contactData);
            return res.status(201).json({
                message: 'Contact form submitted successfully',
                id: contact.id
            });
        }
        // Flights API
        if (path === '/flights' && req.method === 'GET') {
            const { from, to } = req.query;
            const flights = await storage_1.storage.searchFlights(from, to);
            return res.json(flights);
        }
        // Hotels API
        if (path === '/hotels' && req.method === 'GET') {
            const { location } = req.query;
            const hotels = await storage_1.storage.searchHotels(location);
            return res.json(hotels);
        }
        // Route not found
        return res.status(404).json({ message: 'API route not found' });
    }
    catch (error) {
        console.error('API Error:', error);
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: 'Invalid data', errors: error.errors });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}
