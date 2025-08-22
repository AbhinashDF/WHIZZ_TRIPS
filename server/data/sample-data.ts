import { randomUUID } from "crypto";
import type { Destination, TripPackage, Flight, Hotel } from "@shared/schema";

// Sample destinations - persistent data that survives deployment
export const sampleDestinations: Destination[] = [
  {
    id: "dest-1",
    name: "Maldives",
    description: "Crystal clear waters and pristine beaches",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&h=300",
    price: "2499",
    rating: "4.8",
    location: "Indian Ocean",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "dest-2",
    name: "Tokyo, Japan",
    description: "Modern cityscape meets ancient traditions",
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=400&h=300",
    price: "1899",
    rating: "4.7",
    location: "Japan",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "dest-3",
    name: "Paris, France",
    description: "The city of lights and romance",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&h=300",
    price: "1599",
    rating: "4.6",
    location: "France",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "dest-4",
    name: "Safari, Kenya",
    description: "Wildlife adventures in the savanna",
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&h=300",
    price: "3299",
    rating: "4.9",
    location: "Kenya",
    createdAt: new Date("2024-01-01")
  }
];

// Sample trip packages - persistent data
export const samplePackages: TripPackage[] = [
  {
    id: "pkg-1",
    title: "Maldives Paradise Retreat",
    description: "7 days in overwater villas with private pools, spa treatments, and gourmet dining.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&h=300",
    price: "4999",
    duration: 7,
    category: "luxury",
    rating: "5.0",
    inclusions: ["Overwater villa accommodation", "All meals & premium beverages", "Spa treatments & water activities"],
    location: "Maldives",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-2",
    title: "Himalayan Base Camp Trek",
    description: "14-day guided trek to Everest Base Camp with experienced Sherpa guides.",
    imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=500&h=300",
    price: "2899",
    duration: 14,
    category: "adventure",
    rating: "4.8",
    inclusions: ["Expert Sherpa guides", "All permits & equipment", "Mountain lodge accommodation"],
    location: "Nepal",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-3",
    title: "Japan Family Discovery",
    description: "10 days exploring Tokyo, Kyoto, and Osaka with family-friendly activities.",
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=500&h=300",
    price: "3299",
    duration: 10,
    category: "family",
    rating: "4.9",
    inclusions: ["Theme park tickets included", "Kid-friendly restaurants", "Cultural workshops for children"],
    location: "Japan",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-4",
    title: "Morocco Cultural Immersion",
    description: "8 days exploring imperial cities, markets, and Sahara Desert camping.",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d0e5cd?auto=format&fit=crop&w=500&h=300",
    price: "1899",
    duration: 8,
    category: "cultural",
    rating: "4.7",
    inclusions: ["Sahara Desert camping", "Traditional cooking classes", "Local guide experiences"],
    location: "Morocco",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-5",
    title: "Premium African Safari",
    description: "9 days luxury safari across Kenya and Tanzania with exclusive game viewing.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=500&h=300",
    price: "6799",
    duration: 9,
    category: "luxury",
    rating: "5.0",
    inclusions: ["Luxury tented camps", "Private game drives", "Big 5 wildlife viewing"],
    location: "Kenya & Tanzania",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-6",
    title: "Caribbean Family Fun",
    description: "7 days all-inclusive resort with kids club, water sports, and family activities.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&h=300",
    price: "2199",
    duration: 7,
    category: "family",
    rating: "4.6",
    inclusions: ["All-inclusive meals & drinks", "Kids club & teen activities", "Water sports & beach access"],
    location: "Caribbean",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-7",
    title: "India Cultural Heritage",
    description: "12 days exploring the Golden Triangle with authentic cultural experiences.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&h=300",
    price: "2299",
    duration: 12,
    category: "cultural",
    rating: "4.8",
    inclusions: ["Taj Mahal & Red Fort tours", "Traditional dance performances", "Local cooking workshops"],
    location: "India",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-8",
    title: "Peru Machu Picchu Explorer",
    description: "9 days discovering ancient Incan civilization and local traditions.",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=500&h=300",
    price: "2799",
    duration: 9,
    category: "cultural",
    rating: "4.9",
    inclusions: ["Machu Picchu guided tour", "Sacred Valley exploration", "Andean village visits"],
    location: "Peru",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "pkg-9",
    title: "Greece Island Mythology",
    description: "10 days exploring ancient Greek culture across multiple islands.",
    imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258734?auto=format&fit=crop&w=500&h=300",
    price: "3199",
    duration: 10,
    category: "cultural",
    rating: "4.7",
    inclusions: ["Acropolis & Parthenon tours", "Archaeological site visits", "Traditional Greek cuisine"],
    location: "Greece",
    createdAt: new Date("2024-01-01")
  }
];

// Sample flights - persistent data
export const sampleFlights: Flight[] = [
  {
    id: "flight-1",
    airline: "British Airways",
    from: "NYC",
    to: "LON",
    departureTime: "08:30",
    arrivalTime: "14:45",
    duration: "6h 15m",
    stops: 1,
    price: "649",
    class: "economy",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "flight-2",
    airline: "Emirates",
    from: "NYC",
    to: "DXB",
    departureTime: "23:50",
    arrivalTime: "19:30",
    duration: "12h 40m",
    stops: 0,
    price: "899",
    class: "economy",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "flight-3",
    airline: "Japan Airlines",
    from: "LAX",
    to: "NRT",
    departureTime: "11:30",
    arrivalTime: "15:45+1",
    duration: "11h 15m",
    stops: 0,
    price: "1299",
    class: "economy",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "flight-4",
    airline: "Air France",
    from: "JFK",
    to: "CDG",
    departureTime: "22:15",
    arrivalTime: "11:30+1",
    duration: "7h 15m",
    stops: 0,
    price: "789",
    class: "economy",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "flight-5",
    airline: "Kenya Airways",
    from: "JFK",
    to: "NBO",
    departureTime: "06:45",
    arrivalTime: "05:30+1",
    duration: "14h 45m",
    stops: 1,
    price: "1199",
    class: "economy",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "flight-6",
    airline: "Qatar Airways",
    from: "LAX",
    to: "MLE",
    departureTime: "14:20",
    arrivalTime: "06:15+2",
    duration: "22h 55m",
    stops: 2,
    price: "1599",
    class: "economy",
    createdAt: new Date("2024-01-01")
  }
];

// Sample hotels - persistent data
export const sampleHotels: Hotel[] = [
  {
    id: "hotel-1",
    name: "Grand Ocean Resort",
    location: "Maldives",
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=300&h=200",
    rating: "5.0",
    pricePerNight: "289",
    amenities: ["Ocean view", "Pool", "Spa", "Free WiFi"],
    description: "Luxury resort with overwater villas and world-class amenities",
    starRating: 5,
    distanceFromCenter: "0.5 miles from beach",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "hotel-2",
    name: "Tokyo Central Hotel",
    location: "Tokyo, Japan",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=300&h=200",
    rating: "4.7",
    pricePerNight: "189",
    amenities: ["City view", "Gym", "Restaurant", "Free WiFi"],
    description: "Modern hotel in the heart of Tokyo with easy access to attractions",
    starRating: 4,
    distanceFromCenter: "2 miles from city center",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "hotel-3",
    name: "Le Marais Boutique Hotel",
    location: "Paris, France",
    imageUrl: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=300&h=200",
    rating: "4.8",
    pricePerNight: "245",
    amenities: ["Historic building", "Breakfast", "Concierge", "Free WiFi"],
    description: "Charming boutique hotel in the historic Marais district",
    starRating: 4,
    distanceFromCenter: "1 mile from Louvre",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "hotel-4",
    name: "Safari Lodge Kenya",
    location: "Kenya",
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=300&h=200",
    rating: "4.9",
    pricePerNight: "399",
    amenities: ["Safari tours", "Restaurant", "Pool", "Nature view"],
    description: "Authentic safari lodge with stunning wildlife views",
    starRating: 4,
    distanceFromCenter: "15 miles from Nairobi",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "hotel-5",
    name: "Taj Palace Hotel",
    location: "India",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&h=200",
    rating: "4.6",
    pricePerNight: "125",
    amenities: ["Traditional decor", "Spa", "Restaurant", "Cultural tours"],
    description: "Magnificent palace hotel showcasing Indian heritage",
    starRating: 5,
    distanceFromCenter: "3 miles from Taj Mahal",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "hotel-6",
    name: "Santorini Cliffside Resort",
    location: "Greece",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=300&h=200",
    rating: "4.9",
    pricePerNight: "295",
    amenities: ["Sea view", "Infinity pool", "Restaurant", "Sunset terrace"],
    description: "Stunning cliffside resort with breathtaking Aegean Sea views",
    starRating: 5,
    distanceFromCenter: "2 miles from Oia",
    createdAt: new Date("2024-01-01")
  }
];