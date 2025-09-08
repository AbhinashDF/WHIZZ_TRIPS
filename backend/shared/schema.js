"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertHotelSchema = exports.insertFlightSchema = exports.insertContactSchema = exports.insertBookingSchema = exports.insertTripPackageSchema = exports.insertDestinationSchema = exports.insertUserSchema = exports.hotels = exports.flights = exports.contacts = exports.bookings = exports.tripPackages = exports.destinations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.destinations = (0, pg_core_1.pgTable)("destinations", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    rating: (0, pg_core_1.decimal)("rating", { precision: 2, scale: 1 }).notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.tripPackages = (0, pg_core_1.pgTable)("trip_packages", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    duration: (0, pg_core_1.integer)("duration").notNull(), // days
    category: (0, pg_core_1.text)("category").notNull(), // luxury, adventure, family, cultural
    rating: (0, pg_core_1.decimal)("rating", { precision: 2, scale: 1 }).notNull(),
    inclusions: (0, pg_core_1.text)("inclusions").array().notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.bookings = (0, pg_core_1.pgTable)("bookings", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    packageId: (0, pg_core_1.varchar)("package_id").references(() => exports.tripPackages.id),
    firstName: (0, pg_core_1.text)("first_name").notNull(),
    lastName: (0, pg_core_1.text)("last_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    travelers: (0, pg_core_1.integer)("travelers").notNull(),
    departureDate: (0, pg_core_1.timestamp)("departure_date").notNull(),
    returnDate: (0, pg_core_1.timestamp)("return_date"),
    totalPrice: (0, pg_core_1.decimal)("total_price", { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.text)("status").notNull().default("pending"), // pending, confirmed, cancelled
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.contacts = (0, pg_core_1.pgTable)("contacts", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    firstName: (0, pg_core_1.text)("first_name").notNull(),
    lastName: (0, pg_core_1.text)("last_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    subject: (0, pg_core_1.text)("subject"),
    message: (0, pg_core_1.text)("message").notNull(),
    newsletter: (0, pg_core_1.boolean)("newsletter").default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.flights = (0, pg_core_1.pgTable)("flights", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    airline: (0, pg_core_1.text)("airline").notNull(),
    from: (0, pg_core_1.text)("from_location").notNull(),
    to: (0, pg_core_1.text)("to_location").notNull(),
    departureTime: (0, pg_core_1.text)("departure_time").notNull(),
    arrivalTime: (0, pg_core_1.text)("arrival_time").notNull(),
    duration: (0, pg_core_1.text)("duration").notNull(),
    stops: (0, pg_core_1.integer)("stops").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    class: (0, pg_core_1.text)("class").notNull().default("economy"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.hotels = (0, pg_core_1.pgTable)("hotels", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    rating: (0, pg_core_1.decimal)("rating", { precision: 2, scale: 1 }).notNull(),
    pricePerNight: (0, pg_core_1.decimal)("price_per_night", { precision: 10, scale: 2 }).notNull(),
    amenities: (0, pg_core_1.text)("amenities").array().notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    starRating: (0, pg_core_1.integer)("star_rating").notNull(),
    distanceFromCenter: (0, pg_core_1.text)("distance_from_center"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// Insert schemas
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).omit({ id: true });
exports.insertDestinationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.destinations).omit({ id: true, createdAt: true });
exports.insertTripPackageSchema = (0, drizzle_zod_1.createInsertSchema)(exports.tripPackages).omit({ id: true, createdAt: true });
exports.insertBookingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.bookings).omit({ id: true, createdAt: true, status: true });
exports.insertContactSchema = (0, drizzle_zod_1.createInsertSchema)(exports.contacts).omit({ id: true, createdAt: true });
exports.insertFlightSchema = (0, drizzle_zod_1.createInsertSchema)(exports.flights).omit({ id: true, createdAt: true });
exports.insertHotelSchema = (0, drizzle_zod_1.createInsertSchema)(exports.hotels).omit({ id: true, createdAt: true });
