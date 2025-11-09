# Vercel Deployment Guide

This document explains how the Vercel deployment configuration works for this project.

## Overview

This project has been configured for seamless deployment to Vercel. The configuration includes:

- **vercel.json**: Main configuration file for Vercel deployment
- **API Routes**: Next.js serverless functions replacing the Express backend
- **Environment Variables**: Secure configuration for Pinata API keys

## Architecture

### Local Development
- Frontend: Next.js app running on port 3000
- Backend: Express server running on port 3001
- Separation allows for independent development and testing

### Production (Vercel)
- Frontend: Next.js app with server-side rendering
- Backend: Serverless API routes integrated into Next.js
- Single deployment, no separate backend server needed

## Files Created/Modified

### 1. vercel.json
Main configuration file that tells Vercel how to build and deploy the application:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "PINATA_API_KEY": "@pinata-api-key",
    "PINATA_SECRET_KEY": "@pinata-secret-key"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        // CORS headers configuration
      ]
    }
  ]
}
```

**Key Configuration:**
- `framework: "nextjs"` - Tells Vercel this is a Next.js application
- `buildCommand` - Command to build the production bundle
- `env` - Environment variables (stored securely in Vercel dashboard)
- `headers` - CORS configuration for API routes

### 2. API Routes

Three serverless API endpoints created in `/app/api/`:

#### `/api/upload-image` (`app/api/upload-image/route.ts`)
- Accepts multipart/form-data with image file
- Uploads to Pinata IPFS
- Returns IPFS URI

#### `/api/upload-metadata` (`app/api/upload-metadata/route.ts`)
- Accepts JSON metadata
- Uploads to Pinata IPFS
- Returns metadata URI

#### `/api/health` (`app/api/health/route.ts`)
- Health check endpoint
- Returns `{ status: 'ok' }`

### 3. Dependencies
Added `axios` to frontend package.json for API route HTTP requests to Pinata.

### 4. Environment Variables

#### Development (.env.local)
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001  # For separate backend
PINATA_API_KEY=your_key
PINATA_SECRET_KEY=your_secret
```

#### Production (Vercel Dashboard)
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=  # Empty - uses same domain
PINATA_API_KEY=your_key
PINATA_SECRET_KEY=your_secret
```

## Deployment Steps

### 1. Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Pinata API credentials

### 2. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js configuration
5. Add environment variables:
   - `PINATA_API_KEY`
   - `PINATA_SECRET_KEY`
   - `NEXT_PUBLIC_SOLANA_NETWORK`
6. Click "Deploy"

### 3. Verify Deployment
Once deployed, test the API endpoints:

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Expected response: {"status":"ok"}
```

## Migration from Separate Backend

The original architecture had:
- Express backend in `/backend` directory
- Frontend making requests to `http://localhost:3001`

Now on Vercel:
- Express endpoints converted to Next.js API routes
- Frontend makes requests to same domain (relative URLs)
- No separate backend deployment needed

## Benefits

1. **Simplified Deployment**: Single deployment process
2. **Better Performance**: API routes run on same infrastructure
3. **Cost Effective**: No separate backend hosting needed
4. **Automatic Scaling**: Vercel handles scaling automatically
5. **Built-in CDN**: Global edge network for fast response times
6. **HTTPS**: Automatic SSL certificates

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

### API Routes Don't Work
- Verify environment variables are set in Vercel
- Check Pinata API keys are correct
- Review function logs in Vercel dashboard

### CORS Issues
- Check `vercel.json` headers configuration
- Ensure origin is allowed in CORS settings
- Verify request headers match allowed headers

## Testing Locally

To test the Vercel configuration locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Run in Vercel environment
vercel dev
```

This starts a local server that mimics Vercel's production environment.

## Security Considerations

1. **API Keys**: Never commit `.env` files to repository
2. **Environment Variables**: Use Vercel's secure environment variable storage
3. **CORS**: Configured for all origins (*) - consider restricting in production
4. **Rate Limiting**: Consider implementing rate limiting for API routes
5. **Input Validation**: API routes validate file types and sizes

## Performance Optimization

1. **Caching**: Vercel automatically caches static assets
2. **Edge Functions**: API routes run on edge network
3. **Image Optimization**: Next.js Image component optimizes images
4. **Bundle Size**: Tree-shaking removes unused code

## Monitoring

- View deployment logs in Vercel dashboard
- Monitor function execution time
- Track error rates and response times
- Set up alerts for failures

## Further Reading

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Environment Variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
