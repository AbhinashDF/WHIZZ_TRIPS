# GlobeTrotter Frontend

This is the frontend application for GlobeTrotter, a travel booking platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env.local
```

3. Update `.env.local` with your backend API URL:
```
VITE_API_URL=https://your-backend-domain.vercel.app
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building

```bash
npm run build
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the following environment variables in Vercel:
   - `VITE_API_URL`: Your backend API URL
4. Deploy!

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/lib/` - Utility functions and configurations
- `src/hooks/` - Custom React hooks

