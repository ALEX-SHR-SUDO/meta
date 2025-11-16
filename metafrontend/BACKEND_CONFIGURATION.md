# Backend URL Configuration Guide

This guide explains how to configure the backend API URL for the metafrontend application.

## Overview

The frontend application needs to communicate with the backend API to upload images and metadata to IPFS. The backend URL must be configured correctly for the application to work.

## Configuration Methods

### 1. Local Development

For local development, create a `.env.local` file in the root of the metafrontend directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set the backend URL:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**Important**: The backend must be running on the specified port (default: 3001).

### 2. Production Deployment (Vercel)

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Navigate to: **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_BACKEND_URL`
   - **Value**: Your deployed backend URL (e.g., `https://metabackend.onrender.com`)
4. Redeploy your application for changes to take effect

### 3. Other Deployment Platforms

For other hosting platforms:

1. Set the environment variable `NEXT_PUBLIC_BACKEND_URL` in your hosting platform's environment configuration
2. Value should be your deployed backend URL
3. Ensure the backend is accessible from your frontend's domain

## Code Location

The backend URL is used in the following file:

**File**: `utils/pinata.ts`

```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
```

This constant is used for all API calls to the backend:
- `/api/upload-image` - Upload logo to IPFS
- `/api/upload-metadata` - Upload metadata to IPFS

## Testing the Connection

### 1. Check Backend Health

First, ensure your backend is running and accessible:

```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{"status":"ok"}
```

### 2. Test from Frontend

1. Start your frontend application
2. Open the browser's Developer Console (F12)
3. Go to the **Network** tab
4. Try uploading a logo
5. Check the API calls - they should be going to your configured backend URL

## Common Issues

### Issue: "Failed to upload image"

**Cause**: Frontend cannot connect to backend

**Solutions**:
1. Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
2. Ensure backend is running and accessible
3. Check CORS settings in backend allow your frontend domain
4. Check browser console for exact error messages

### Issue: CORS errors

**Cause**: Backend not configured to accept requests from frontend domain

**Solutions**:
1. In metabackend, ensure CORS is enabled in `src/server.ts`
2. For production, configure allowed origins in backend
3. Redeploy backend after CORS changes

### Issue: Environment variable not updating

**Cause**: Next.js caches environment variables

**Solutions**:
1. Clear Next.js cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Restart dev server: `npm run dev`
4. For Vercel: Redeploy after changing environment variables

## Environment Variable Examples

### Local Development
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### Production (Backend on Render)
```env
NEXT_PUBLIC_BACKEND_URL=https://metabackend.onrender.com
```

### Production (Backend on Custom Domain)
```env
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
```

### Staging Environment
```env
NEXT_PUBLIC_BACKEND_URL=https://staging-backend.onrender.com
```

## Security Notes

✅ **NEXT_PUBLIC_** prefix is required for environment variables used in browser
✅ Backend URL is safe to expose (it's public anyway)
✅ API keys are **never** stored in frontend - they're in backend only
✅ Use HTTPS for production backend URLs

## Quick Reference

| Environment | File/Location | Example Value |
|-------------|---------------|---------------|
| Local Dev | `.env.local` | `http://localhost:3001` |
| Production | Vercel Environment Variables | `https://metabackend.onrender.com` |
| Code | `utils/pinata.ts` | Line 5 |

## Need Help?

1. Check that backend is deployed and running
2. Verify environment variables are set correctly
3. Check browser console for error messages
4. Ensure CORS is properly configured in backend

For backend deployment instructions, see the metabackend repository: https://github.com/ALEX-SHR-SUDO/metabackend
