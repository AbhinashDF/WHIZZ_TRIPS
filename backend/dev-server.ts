import express from "express";
import { z } from "zod";
import { insertBookingSchema, insertContactSchema } from "./shared/schema";
import { storage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// API Routes
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await storage.getAllDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await storage.getDestination(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/trip-packages', async (req, res) => {
  try {
    const { category } = req.query;
    const packages = await storage.getTripPackagesByCategory(category as string);
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/trip-packages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tripPackage = await storage.getTripPackage(id);
    if (!tripPackage) {
      return res.status(404).json({ message: 'Trip package not found' });
    }
    res.json(tripPackage);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = insertBookingSchema.parse(req.body);
    const booking = await storage.createBooking(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await storage.getBooking(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch('/api/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    const booking = await storage.updateBookingStatus(id, status);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contactData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(contactData);
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact.id
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/flights', async (req, res) => {
  try {
    const { from, to } = req.query;
    const flights = await storage.searchFlights(from as string, to as string);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/hotels', async (req, res) => {
  try {
    const { location } = req.query;
    const hotels = await storage.searchHotels(location as string);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📚 API documentation available at http://localhost:${PORT}/api/health`);
});

