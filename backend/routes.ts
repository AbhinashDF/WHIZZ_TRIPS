import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations API
  app.get("/api/destinations", async (_req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Trip packages API
  app.get("/api/trip-packages", async (req, res) => {
    try {
      const category = req.query.category as string;
      const packages = await storage.getTripPackagesByCategory(category);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip packages" });
    }
  });

  app.get("/api/trip-packages/:id", async (req, res) => {
    try {
      const tripPackage = await storage.getTripPackage(req.params.id);
      if (!tripPackage) {
        return res.status(404).json({ message: "Trip package not found" });
      }
      res.json(tripPackage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip package" });
    }
  });

  // Bookings API
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const booking = await storage.updateBookingStatus(req.params.id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  // Contact form API
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: contact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Flights API
  app.get("/api/flights", async (req, res) => {
    try {
      const { from, to } = req.query;
      const flights = await storage.searchFlights(from as string, to as string);
      res.json(flights);
    } catch (error) {
      res.status(500).json({ message: "Failed to search flights" });
    }
  });

  // Hotels API
  app.get("/api/hotels", async (req, res) => {
    try {
      const { location } = req.query;
      const hotels = await storage.searchHotels(location as string);
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to search hotels" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
