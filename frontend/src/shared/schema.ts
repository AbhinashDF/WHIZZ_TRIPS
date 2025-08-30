import { z } from "zod";

// TypeScript interfaces for frontend use
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: string;
  location: string;
  createdAt: string;
}

export interface TripPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  duration: number; // days
  category: string; // luxury, adventure, family, cultural
  rating: string;
  inclusions: string[];
  location: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  packageId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  travelers: number;
  departureDate: string;
  returnDate?: string;
  totalPrice: string;
  status: string; // pending, confirmed, cancelled
  createdAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  newsletter: boolean;
  createdAt: string;
}

export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: string;
  class: string;
  createdAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: string;
  pricePerNight: string;
  amenities: string[];
  description: string;
  starRating: number;
  distanceFromCenter?: string;
  createdAt: string;
}

// Zod schemas for validation
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export const destinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  price: z.string(),
  rating: z.string(),
  location: z.string(),
  createdAt: z.string(),
});

export const tripPackageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  price: z.string(),
  duration: z.number(),
  category: z.string(),
  rating: z.string(),
  inclusions: z.array(z.string()),
  location: z.string(),
  createdAt: z.string(),
});

export const bookingSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  travelers: z.number(),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  totalPrice: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

export const contactSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string(),
  newsletter: z.boolean(),
  createdAt: z.string(),
});

export const flightSchema = z.object({
  id: z.string(),
  airline: z.string(),
  from: z.string(),
  to: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  duration: z.string(),
  stops: z.number(),
  price: z.string(),
  class: z.string(),
  createdAt: z.string(),
});

export const hotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  rating: z.string(),
  pricePerNight: z.string(),
  amenities: z.array(z.string()),
  description: z.string(),
  starRating: z.number(),
  distanceFromCenter: z.string().optional(),
  createdAt: z.string(),
});

// Insert schemas (without id and createdAt for form submissions)
export const insertUserSchema = userSchema.omit({ id: true });
export const insertDestinationSchema = destinationSchema.omit({ id: true, createdAt: true });
export const insertTripPackageSchema = tripPackageSchema.omit({ id: true, createdAt: true });
export const insertBookingSchema = bookingSchema.omit({ id: true, createdAt: true, status: true });
export const insertContactSchema = contactSchema.omit({ id: true, createdAt: true });
export const insertFlightSchema = flightSchema.omit({ id: true, createdAt: true });
export const insertHotelSchema = hotelSchema.omit({ id: true, createdAt: true });

// Type exports for use in components
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type InsertTripPackage = z.infer<typeof insertTripPackageSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
