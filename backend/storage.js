"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
const crypto_1 = require("crypto");
const sample_data_1 = require("./data/sample-data");
class MemStorage {
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
    initializePersistentData() {
        // Use persistent sample data with fixed IDs
        sample_data_1.sampleDestinations.forEach(dest => this.destinations.set(dest.id, dest));
        sample_data_1.samplePackages.forEach(pkg => this.tripPackages.set(pkg.id, pkg));
        sample_data_1.sampleFlights.forEach(flight => this.flights.set(flight.id, flight));
        sample_data_1.sampleHotels.forEach(hotel => this.hotels.set(hotel.id, hotel));
    }
    // User operations
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        return Array.from(this.users.values()).find(user => user.username === username);
    }
    async createUser(insertUser) {
        const id = (0, crypto_1.randomUUID)();
        const user = { ...insertUser, id };
        this.users.set(id, user);
        return user;
    }
    // Destination operations
    async getAllDestinations() {
        return Array.from(this.destinations.values());
    }
    async getDestination(id) {
        return this.destinations.get(id);
    }
    async createDestination(insertDestination) {
        const id = (0, crypto_1.randomUUID)();
        const destination = { ...insertDestination, id, createdAt: new Date() };
        this.destinations.set(id, destination);
        return destination;
    }
    // Trip package operations
    async getAllTripPackages() {
        return Array.from(this.tripPackages.values());
    }
    async getTripPackagesByCategory(category) {
        const packages = Array.from(this.tripPackages.values());
        if (!category || category === 'all') {
            return packages;
        }
        return packages.filter(pkg => pkg.category === category);
    }
    async getTripPackage(id) {
        return this.tripPackages.get(id);
    }
    async createTripPackage(insertTripPackage) {
        const id = (0, crypto_1.randomUUID)();
        const tripPackage = { ...insertTripPackage, id, createdAt: new Date() };
        this.tripPackages.set(id, tripPackage);
        return tripPackage;
    }
    // Booking operations
    async getAllBookings() {
        return Array.from(this.bookings.values());
    }
    async getBooking(id) {
        return this.bookings.get(id);
    }
    async createBooking(insertBooking) {
        const id = (0, crypto_1.randomUUID)();
        const booking = {
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
    async updateBookingStatus(id, status) {
        const booking = this.bookings.get(id);
        if (booking) {
            booking.status = status;
            this.bookings.set(id, booking);
            return booking;
        }
        return undefined;
    }
    // Contact operations
    async getAllContacts() {
        return Array.from(this.contacts.values());
    }
    async getContact(id) {
        return this.contacts.get(id);
    }
    async createContact(insertContact) {
        const id = (0, crypto_1.randomUUID)();
        const contact = {
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
    async getAllFlights() {
        return Array.from(this.flights.values());
    }
    async searchFlights(from, to) {
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
    async createFlight(insertFlight) {
        const id = (0, crypto_1.randomUUID)();
        const flight = {
            ...insertFlight,
            id,
            createdAt: new Date(),
            class: insertFlight.class || "economy"
        };
        this.flights.set(id, flight);
        return flight;
    }
    // Hotel operations
    async getAllHotels() {
        return Array.from(this.hotels.values());
    }
    async searchHotels(location) {
        const hotels = Array.from(this.hotels.values());
        if (!location) {
            return hotels;
        }
        return hotels.filter(hotel => hotel.location.toLowerCase().includes(location.toLowerCase()) ||
            hotel.name.toLowerCase().includes(location.toLowerCase()));
    }
    async createHotel(insertHotel) {
        const id = (0, crypto_1.randomUUID)();
        const hotel = {
            ...insertHotel,
            id,
            createdAt: new Date(),
            distanceFromCenter: insertHotel.distanceFromCenter || null
        };
        this.hotels.set(id, hotel);
        return hotel;
    }
}
exports.MemStorage = MemStorage;
// Use in-memory storage for development and deployment environments
// This ensures data persistence with fixed IDs that work across deployments
exports.storage = new MemStorage();
