import {
    type Booking,
    type Contact,
    type Destination,
    type Flight,
    type Hotel,
    type InsertBooking,
    type InsertContact,
    type InsertDestination,
    type InsertFlight,
    type InsertHotel,
    type InsertTripPackage,
    type InsertUser,
    type TripPackage,
    type User
} from "@/src/api/shared/schema";
import { randomUUID } from "crypto";
import { sampleDestinations, sampleFlights, sampleHotels, samplePackages } from "./src/data/sample-data";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Destination operations
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Trip package operations
  getAllTripPackages(): Promise<TripPackage[]>;
  getTripPackagesByCategory(category?: string): Promise<TripPackage[]>;
  getTripPackage(id: string): Promise<TripPackage | undefined>;
  createTripPackage(tripPackage: InsertTripPackage): Promise<TripPackage>;

  // Booking operations
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;

  // Contact operations
  getAllContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;

  // Flight operations
  getAllFlights(): Promise<Flight[]>;
  searchFlights(from?: string, to?: string): Promise<Flight[]>;
  createFlight(flight: InsertFlight): Promise<Flight>;

  // Hotel operations
  getAllHotels(): Promise<Hotel[]>;
  searchHotels(location?: string): Promise<Hotel[]>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private destinations: Map<string, Destination>;
  private tripPackages: Map<string, TripPackage>;
  private bookings: Map<string, Booking>;
  private contacts: Map<string, Contact>;
  private flights: Map<string, Flight>;
  private hotels: Map<string, Hotel>;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.tripPackages = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.flights = new Map();
    this.hotels = new Map();

    // Initialize with persistent sample data
    this.initializePersistentData();
  }

  private initializePersistentData() {
    // Use persistent sample data with fixed IDs
    sampleDestinations.forEach(dest => this.destinations.set(dest.id, dest));
    samplePackages.forEach(pkg => this.tripPackages.set(pkg.id, pkg));
    sampleFlights.forEach(flight => this.flights.set(flight.id, flight));
    sampleHotels.forEach(hotel => this.hotels.set(hotel.id, hotel));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Destination operations
  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = randomUUID();
    const destination: Destination = { ...insertDestination, id, createdAt: new Date() };
    this.destinations.set(id, destination);
    return destination;
  }

  // Trip package operations
  async getAllTripPackages(): Promise<TripPackage[]> {
    return Array.from(this.tripPackages.values());
  }

  async getTripPackagesByCategory(category?: string): Promise<TripPackage[]> {
    const packages = Array.from(this.tripPackages.values());
    if (!category || category === 'all') {
      return packages;
    }
    return packages.filter(pkg => pkg.category === category);
  }

  async getTripPackage(id: string): Promise<TripPackage | undefined> {
    return this.tripPackages.get(id);
  }

  async createTripPackage(insertTripPackage: InsertTripPackage): Promise<TripPackage> {
    const id = randomUUID();
    const tripPackage: TripPackage = { ...insertTripPackage, id, createdAt: new Date() };
    this.tripPackages.set(id, tripPackage);
    return tripPackage;
  }

  // Booking operations
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending", 
      createdAt: new Date(),
      packageId: insertBooking.packageId || null,
      phone: insertBooking.phone || null,
      returnDate: insertBooking.returnDate || null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Contact operations
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      phone: insertContact.phone || null,
      subject: insertContact.subject || null,
      newsletter: insertContact.newsletter || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Flight operations
  async getAllFlights(): Promise<Flight[]> {
    return Array.from(this.flights.values());
  }

  async searchFlights(from?: string, to?: string): Promise<Flight[]> {
    const flights = Array.from(this.flights.values());
    if (!from && !to) {
      return flights;
    }
    return flights.filter(flight => {
      const matchFrom = !from || flight.from.toLowerCase().includes(from.toLowerCase());
      const matchTo = !to || flight.to.toLowerCase().includes(to.toLowerCase());
      return matchFrom && matchTo;
    });
  }

  async createFlight(insertFlight: InsertFlight): Promise<Flight> {
    const id = randomUUID();
    const flight: Flight = { 
      ...insertFlight, 
      id, 
      createdAt: new Date(),
      class: insertFlight.class || "economy"
    };
    this.flights.set(id, flight);
    return flight;
  }

  // Hotel operations
  async getAllHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }

  async searchHotels(location?: string): Promise<Hotel[]> {
    const hotels = Array.from(this.hotels.values());
    if (!location) {
      return hotels;
    }
    return hotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase()) ||
      hotel.name.toLowerCase().includes(location.toLowerCase())
    );
  }

  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = randomUUID();
    const hotel: Hotel = { 
      ...insertHotel, 
      id, 
      createdAt: new Date(),
      distanceFromCenter: insertHotel.distanceFromCenter || null
    };
    this.hotels.set(id, hotel);
    return hotel;
  }
}

// Use in-memory storage for development and deployment environments
// This ensures data persistence with fixed IDs that work across deployments
export const storage = new MemStorage();
