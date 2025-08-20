import { 
  type User, type InsertUser,
  type Destination, type InsertDestination,
  type TripPackage, type InsertTripPackage,
  type Booking, type InsertBooking,
  type Contact, type InsertContact,
  type Flight, type InsertFlight,
  type Hotel, type InsertHotel
} from "@shared/schema";
import { randomUUID } from "crypto";

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

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample destinations
    const sampleDestinations: Destination[] = [
      {
        id: randomUUID(),
        name: "Maldives",
        description: "Crystal clear waters and pristine beaches",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&h=300",
        price: "2499",
        rating: "4.8",
        location: "Indian Ocean",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Tokyo, Japan",
        description: "Modern cityscape meets ancient traditions",
        imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=400&h=300",
        price: "1899",
        rating: "4.7",
        location: "Japan",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Paris, France",
        description: "The city of lights and romance",
        imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&h=300",
        price: "1599",
        rating: "4.6",
        location: "France",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Safari, Kenya",
        description: "Wildlife adventures in the savanna",
        imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&h=300",
        price: "3299",
        rating: "4.9",
        location: "Kenya",
        createdAt: new Date()
      }
    ];

    sampleDestinations.forEach(dest => this.destinations.set(dest.id, dest));

    // Sample trip packages
    const samplePackages: TripPackage[] = [
      {
        id: randomUUID(),
        title: "Maldives Paradise Retreat",
        description: "7 days in overwater villas with private pools, spa treatments, and gourmet dining.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&h=300",
        price: "4999",
        duration: 7,
        category: "luxury",
        rating: "5.0",
        inclusions: ["Overwater villa accommodation", "All meals & premium beverages", "Spa treatments & water activities"],
        location: "Maldives",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Himalayan Base Camp Trek",
        description: "14-day guided trek to Everest Base Camp with experienced Sherpa guides.",
        imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=500&h=300",
        price: "2899",
        duration: 14,
        category: "adventure",
        rating: "4.8",
        inclusions: ["Expert Sherpa guides", "All permits & equipment", "Mountain lodge accommodation"],
        location: "Nepal",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Japan Family Discovery",
        description: "10 days exploring Tokyo, Kyoto, and Osaka with family-friendly activities.",
        imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=500&h=300",
        price: "3299",
        duration: 10,
        category: "family",
        rating: "4.9",
        inclusions: ["Theme park tickets included", "Kid-friendly restaurants", "Cultural workshops for children"],
        location: "Japan",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Morocco Cultural Immersion",
        description: "8 days exploring imperial cities, markets, and Sahara Desert camping.",
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d0e5cd?auto=format&fit=crop&w=500&h=300",
        price: "1899",
        duration: 8,
        category: "cultural",
        rating: "4.7",
        inclusions: ["Sahara Desert camping", "Traditional cooking classes", "Local guide experiences"],
        location: "Morocco",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Premium African Safari",
        description: "9 days luxury safari across Kenya and Tanzania with exclusive game viewing.",
        imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=500&h=300",
        price: "6799",
        duration: 9,
        category: "luxury",
        rating: "5.0",
        inclusions: ["Luxury tented camps", "Private game drives", "Big 5 wildlife viewing"],
        location: "Kenya & Tanzania",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Caribbean Family Fun",
        description: "7 days all-inclusive resort with kids club, water sports, and family activities.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&h=300",
        price: "2199",
        duration: 7,
        category: "family",
        rating: "4.6",
        inclusions: ["All-inclusive meals & drinks", "Kids club & teen activities", "Water sports & beach access"],
        location: "Caribbean",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "India Cultural Heritage",
        description: "12 days exploring the Golden Triangle with authentic cultural experiences.",
        imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&h=300",
        price: "2299",
        duration: 12,
        category: "cultural",
        rating: "4.8",
        inclusions: ["Taj Mahal & Red Fort tours", "Traditional dance performances", "Local cooking workshops"],
        location: "India",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Peru Machu Picchu Explorer",
        description: "9 days discovering ancient Incan civilization and local traditions.",
        imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=500&h=300",
        price: "2799",
        duration: 9,
        category: "cultural",
        rating: "4.9",
        inclusions: ["Machu Picchu guided tour", "Sacred Valley exploration", "Andean village visits"],
        location: "Peru",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Greece Island Mythology",
        description: "10 days exploring ancient Greek culture across multiple islands.",
        imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258734?auto=format&fit=crop&w=500&h=300",
        price: "3199",
        duration: 10,
        category: "cultural",
        rating: "4.7",
        inclusions: ["Acropolis & Parthenon tours", "Archaeological site visits", "Traditional Greek cuisine"],
        location: "Greece",
        createdAt: new Date()
      }
    ];

    samplePackages.forEach(pkg => this.tripPackages.set(pkg.id, pkg));

    // Sample flights
    const sampleFlights: Flight[] = [
      {
        id: randomUUID(),
        airline: "British Airways",
        from: "NYC",
        to: "LON",
        departureTime: "08:30",
        arrivalTime: "14:45",
        duration: "6h 15m",
        stops: 1,
        price: "649",
        class: "economy",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        airline: "Emirates",
        from: "NYC",
        to: "DXB",
        departureTime: "23:50",
        arrivalTime: "19:30",
        duration: "12h 40m",
        stops: 0,
        price: "899",
        class: "economy",
        createdAt: new Date()
      }
    ];

    sampleFlights.forEach(flight => this.flights.set(flight.id, flight));

    // Sample hotels
    const sampleHotels: Hotel[] = [
      {
        id: randomUUID(),
        name: "Grand Ocean Resort",
        location: "Maldives",
        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=300&h=200",
        rating: "5.0",
        pricePerNight: "289",
        amenities: ["Ocean view", "Pool", "Spa", "Free WiFi"],
        description: "Luxury resort with overwater villas and world-class amenities",
        starRating: 5,
        distanceFromCenter: "0.5 miles from beach",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Tokyo Central Hotel",
        location: "Tokyo, Japan",
        imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=300&h=200",
        rating: "4.7",
        pricePerNight: "189",
        amenities: ["City view", "Gym", "Restaurant", "Free WiFi"],
        description: "Modern hotel in the heart of Tokyo with easy access to attractions",
        starRating: 4,
        distanceFromCenter: "2 miles from city center",
        createdAt: new Date()
      }
    ];

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

export const storage = new MemStorage();
