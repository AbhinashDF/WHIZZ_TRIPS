# GlobeTrotter Backend

This is the backend API for GlobeTrotter, built with Express.js and deployed as Vercel serverless functions.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env.local
```

3. Update `.env.local` with your configuration:
```
DATABASE_URL=your_database_connection_string_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
SESSION_SECRET=your_session_secret_here
```

## Development

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Building

```bash
npm run build
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the following environment variables in Vercel:
   - `DATABASE_URL`: Your database connection string
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `SESSION_SECRET`: A random string for session encryption
4. Deploy!

## API Endpoints

- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination by ID
- `GET /api/trip-packages` - Get trip packages (with optional category filter)
- `GET /api/trip-packages/:id` - Get trip package by ID
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id/status` - Update booking status
- `POST /api/contacts` - Submit contact form
- `GET /api/flights` - Search flights
- `GET /api/hotels` - Search hotels

## Project Structure

- `api/` - Vercel serverless function entry points
- `server/` - Express.js server code
- `shared/` - Shared schemas and utilities
