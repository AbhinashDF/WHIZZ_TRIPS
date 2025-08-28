# WHIZZ TRAVELS Deployment Guide

## Netlify Deployment

### Setup Instructions

1. **Build the project locally first:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Or drag and drop the `dist` folder to Netlify

3. **Configuration:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

4. **Environment Variables (Optional):**
   ```
   NODE_ENV=production
   ```

### Files Created for Netlify:
- `netlify.toml` - Netlify configuration
- `netlify/functions/api.ts` - Serverless API function
- `.env.example` - Environment variables template

## Vercel Deployment

### Setup Instructions

1. **Install Vercel CLI (optional):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configuration:**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

### Files Created for Vercel:
- `vercel.json` - Vercel configuration
- `api/index.ts` - API serverless function

## Important Notes

### Data Persistence
- The application uses **in-memory storage** with fixed IDs
- All destinations, trip packages, flights, and hotels are pre-loaded with consistent data
- No database setup required - data persists through the application lifecycle

### Features Available After Deployment:
✅ Home page with destinations and services
✅ Trip packages filtered by category (luxury, adventure, family, cultural)
✅ Flight and hotel search with real data
✅ Booking system with payment flow
✅ Contact form with interactive office map
✅ Social media links (Facebook, Instagram, Twitter, YouTube)

### Troubleshooting

1. **No destinations showing:**
   - Check if API routes are working: `https://yoursite.com/api/destinations`
   - Verify CORS headers are properly set

2. **API not working:**
   - Ensure serverless functions are deployed correctly
   - Check function logs in your deployment platform

3. **Missing features:**
   - All data is hardcoded in `server/data/sample-data.ts`
   - No external database dependencies

### Database Setup (Optional - Not Required)

If you want to use a real database instead of in-memory storage:

1. **Set up a PostgreSQL database** (Neon, Supabase, or any PostgreSQL provider)

2. **Add environment variable:**
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database
   ```

3. **Run migrations:**
   ```bash
   npm run db:push
   ```

But for most use cases, the current in-memory setup with persistent data works perfectly for deployment!