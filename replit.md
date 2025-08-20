# Wanderlust Travel - Full-Stack Travel Booking Application

## Overview

Wanderlust Travel is a modern full-stack travel booking application that provides users with a comprehensive platform to discover destinations, browse travel packages, and make bookings. The application features a clean, responsive design with a focus on user experience and includes functionality for browsing destinations, viewing trip packages filtered by category, booking travel arrangements, and contacting the company.

The system is built as a single-page application with a React frontend and Express.js backend, utilizing PostgreSQL for data persistence and modern development tools for a robust development experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern React features
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component system for consistent, accessible design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API endpoints with JSON responses
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Logging**: Custom request logging middleware for API monitoring
- **Development**: Hot reload with Vite integration for seamless development experience

### Database Architecture
- **Database**: PostgreSQL with connection pooling
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema**: Comprehensive schema covering users, destinations, trip packages, bookings, contacts, flights, and hotels
- **Data Validation**: Zod schemas for runtime type checking and API validation
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud hosting

### Data Models
The application manages several core entities:
- **Users**: Authentication and user account management
- **Destinations**: Travel destinations with descriptions, pricing, and ratings
- **Trip Packages**: Categorized travel packages (luxury, adventure, family, cultural) with inclusions
- **Bookings**: Customer booking information with status tracking
- **Contacts**: Customer inquiries and communication
- **Flights & Hotels**: Additional travel services for comprehensive booking

### Authentication & Authorization
- Session-based authentication with PostgreSQL session storage
- User account management with secure password handling
- Role-based access patterns prepared for future admin functionality

### Component Architecture
- Modular component structure with reusable UI components
- Custom hooks for mobile responsiveness and toast notifications
- Separation of concerns between presentation and business logic components
- Consistent styling through design system and component variants

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation integration

### Database & Backend
- **drizzle-orm**: Type-safe SQL query builder
- **drizzle-kit**: Database migration tools
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **connect-pg-simple**: PostgreSQL session store

### UI & Styling
- **@radix-ui/***: Accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Validation & Utilities
- **zod**: Schema validation library
- **drizzle-zod**: Drizzle ORM Zod integration
- **clsx**: Conditional className utility
- **date-fns**: Date manipulation library

### Development Tools
- **vite**: Build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **typescript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit integration tools

### Carousel & Interactive Elements
- **embla-carousel-react**: Touch-friendly carousel component
- **cmdk**: Command palette and search interface