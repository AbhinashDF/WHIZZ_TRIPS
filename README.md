# GlobeTrotter

A modern travel booking platform built with React, Express.js, and TypeScript, designed for deployment on Vercel.

## Project Structure

This project has been restructured for separate frontend and backend deployment on Vercel:

```
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── package.json  # Frontend dependencies
│   └── vercel.json   # Frontend Vercel config
├── backend/           # Express.js backend API
│   ├── api/          # Vercel serverless functions
│   ├── server/       # Server code
│   ├── shared/       # Shared schemas and utilities
│   ├── package.json  # Backend dependencies
│   └── vercel.json   # Backend Vercel config
└── README.md         # This file
```

## Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Deployment

### 1. Deploy Backend First
1. Navigate to the `backend` folder
2. Deploy to Vercel (this will give you your API URL)
3. Note the deployment URL

### 2. Deploy Frontend
1. Navigate to the `frontend` folder
2. Set `VITE_API_URL` environment variable to your backend URL
3. Deploy to Vercel

## Environment Variables

### Backend (.env.local)
```
DATABASE_URL=your_database_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
SESSION_SECRET=your_session_secret
```

### Frontend (.env.local)
```
VITE_API_URL=https://your-backend-domain.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Features

- 🏝️ Destination browsing and search
- ✈️ Flight and hotel search
- 🎒 Trip package booking
- 💳 Stripe payment integration
- 📱 Responsive design
- 🔐 User authentication
- 📊 Admin dashboard

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Vercel (Frontend + Backend)
- **Payment**: Stripe
- **Styling**: Radix UI components

## API Documentation

See the [Backend README](./backend/README.md) for detailed API endpoint documentation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
