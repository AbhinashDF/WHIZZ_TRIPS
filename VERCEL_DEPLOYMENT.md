# Vercel Deployment Guide for GlobeTrotter

This guide will walk you through deploying both the frontend and backend of GlobeTrotter to Vercel.

## Prerequisites

- GitHub account
- Vercel account
- Database (PostgreSQL recommended)
- Stripe account (for payments)

## Step 1: Deploy Backend First

### 1.1 Prepare Backend Repository
1. Navigate to the `backend` folder
2. Initialize git if not already done:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   ```

### 1.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Set the following configuration:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 1.3 Set Environment Variables
In your Vercel project settings, add these environment variables:
```
DATABASE_URL=your_database_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
SESSION_SECRET=your_random_session_secret
NODE_ENV=production
```

### 1.4 Deploy
Click "Deploy" and wait for the build to complete. Note the deployment URL (e.g., `https://your-backend.vercel.app`).

## Step 2: Deploy Frontend

### 2.1 Prepare Frontend Repository
1. Navigate to the `frontend` folder
2. Initialize git if not already done:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   ```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Set the following configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2.3 Set Environment Variables
In your Vercel project settings, add these environment variables:
```
VITE_API_URL=https://your-backend.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**Important**: Replace `your-backend.vercel.app` with the actual URL from Step 1.

### 2.4 Deploy
Click "Deploy" and wait for the build to complete.

## Step 3: Test Your Deployment

### 3.1 Test Backend API
Visit your backend URL and test an endpoint:
```
https://your-backend.vercel.app/api/destinations
```

### 3.2 Test Frontend
Visit your frontend URL and verify it's working correctly.

### 3.3 Test API Integration
Check that your frontend can successfully communicate with your backend API.

## Troubleshooting

### Common Issues

1. **CORS Errors**: The backend is already configured with CORS headers for Vercel deployment.

2. **Environment Variables**: Make sure all environment variables are set correctly in Vercel.

3. **Build Failures**: Check the build logs in Vercel for specific error messages.

4. **API Not Found**: Ensure your backend is deployed and the URL is correct.

### Database Connection
- Make sure your database is accessible from Vercel's servers
- Consider using a managed database service like Neon, Supabase, or Railway
- Update the `DATABASE_URL` in your backend environment variables

### Stripe Configuration
- Ensure your Stripe keys are correct
- Test with Stripe test keys first
- Update webhook endpoints in Stripe dashboard if needed

## Monitoring and Maintenance

### Vercel Analytics
- Enable Vercel Analytics to monitor your application performance
- Set up error tracking and monitoring

### Database Monitoring
- Monitor your database performance
- Set up alerts for connection issues

### API Monitoring
- Use Vercel's built-in monitoring tools
- Consider setting up external monitoring services

## Cost Optimization

- Vercel offers a generous free tier
- Monitor your usage to avoid unexpected charges
- Consider upgrading only when necessary

## Security Best Practices

- Never commit environment variables to git
- Use strong, unique session secrets
- Regularly rotate API keys
- Enable Vercel's security features

## Support

If you encounter issues:
1. Check Vercel's documentation
2. Review the build logs
3. Check the application logs
4. Consult the project README files

## Next Steps

After successful deployment:
1. Set up a custom domain (optional)
2. Configure SSL certificates
3. Set up monitoring and alerts
4. Plan for scaling and optimization

