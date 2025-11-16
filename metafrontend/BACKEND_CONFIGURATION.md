# Backend URL Configuration Guide

This document explains where and how to configure the backend API URL in the frontend application.

## Overview

The frontend application needs to communicate with the backend API to:
- Upload token logo images to IPFS
- Upload token metadata to IPFS

The backend URL must be configured properly for the application to work.

## Configuration Locations

### 1. Environment Variable (Primary Method)

**File**: `.env.local` (for development) or deployment platform settings (for production)

**Variable Name**: `NEXT_PUBLIC_BACKEND_URL`

**Default Value**: `http://localhost:3001`

#### Local Development

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

#### Production Deployment (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_BACKEND_URL`
   - **Value**: Your deployed backend URL (e.g., `https://metabackend.onrender.com`)
4. Save and redeploy your application

### 2. Code Usage

**File**: `utils/pinata.ts`

**Line 5**:
```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
```

This is where the environment variable is read and used throughout the application.

## Backend API Endpoints

The frontend makes requests to the following backend endpoints:

1. **Upload Image**
   - Endpoint: `POST ${BACKEND_URL}/api/upload-image`
   - Usage: `utils/pinata.ts` - `uploadImageToPinata()` function
   - Purpose: Upload token logo to IPFS

2. **Upload Metadata**
   - Endpoint: `POST ${BACKEND_URL}/api/upload-metadata`
   - Usage: `utils/pinata.ts` - `uploadMetadataToPinata()` function
   - Purpose: Upload token metadata JSON to IPFS

## Step-by-Step Setup

### For Local Development

1. **Start the backend server** (from metabackend repository):
   ```bash
   cd metabackend
   npm run dev
   ```
   Backend runs on `http://localhost:3001`

2. **Configure frontend** (in metafrontend repository):
   ```bash
   cd metafrontend
   cp .env.example .env.local
   ```

3. **Edit `.env.local`**:
   ```env
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   ```

4. **Start the frontend**:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

### For Production Deployment

#### Step 1: Deploy Backend

1. Deploy backend to Render (or your preferred platform)
2. Note your backend URL (e.g., `https://metabackend.onrender.com`)
3. Ensure environment variables are set:
   - `PINATA_API_KEY`
   - `PINATA_SECRET_KEY`
   - `PORT=10000`

#### Step 2: Deploy Frontend

1. **Configure Vercel Environment Variables**:
   - Go to Vercel project settings
   - Add environment variable:
     ```
     NEXT_PUBLIC_BACKEND_URL=https://metabackend.onrender.com
     ```
     (Replace with your actual backend URL)

2. **Deploy**:
   ```bash
   git push origin main
   ```
   Vercel will automatically build and deploy

## Verification

### Test Backend Connection

1. Open browser developer console (F12)
2. Navigate to your frontend application
3. Try to upload a token logo
4. Check the Network tab to see API calls to your backend URL
5. Verify successful responses (status 200)

### Common Issues

**Error: "Failed to upload image"**
- ✅ Check that `NEXT_PUBLIC_BACKEND_URL` is correctly set
- ✅ Verify backend server is running and accessible
- ✅ Check browser console for specific error messages
- ✅ Ensure CORS is configured in backend

**Error: "Network error"**
- ✅ Verify the backend URL is correct (no typos)
- ✅ Check that backend is deployed and running
- ✅ Ensure there are no firewall or network restrictions

**Error: "CORS policy blocked"**
- ✅ Check backend CORS configuration in `src/server.ts`
- ✅ Ensure frontend domain is allowed
- ✅ Verify backend is accepting requests from your frontend URL

## Advanced Configuration

### Using Custom Backend URL at Build Time

If you want to set a different backend URL during build time:

```bash
NEXT_PUBLIC_BACKEND_URL=https://custom-backend.com npm run build
```

### Environment-Specific URLs

You can use different URLs for different environments:

**`.env.development.local`** (for `npm run dev`):
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**`.env.production.local`** (for `npm run build`):
```env
NEXT_PUBLIC_BACKEND_URL=https://metabackend.onrender.com
```

### Checking Current Configuration

You can check the current backend URL in the browser console:

```javascript
console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
```

Or add a debug log in `utils/pinata.ts`:

```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
console.log('Backend URL:', BACKEND_URL);
```

## Security Notes

- ✅ The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser
- ✅ Never put sensitive data (API keys, secrets) in `NEXT_PUBLIC_` variables
- ✅ Backend API keys are stored securely on the backend server only
- ✅ Frontend only knows the backend URL, not the Pinata credentials

## Summary

**Quick Reference:**

| Environment | Configuration Method | Example Value |
|-------------|---------------------|---------------|
| Local Development | `.env.local` file | `http://localhost:3001` |
| Production (Vercel) | Environment Variables in Vercel Dashboard | `https://metabackend.onrender.com` |
| Code Reference | `utils/pinata.ts` Line 5 | `process.env.NEXT_PUBLIC_BACKEND_URL` |

**Key Files:**
- 📄 `.env.local` - Local environment configuration
- 📄 `.env.example` - Template with default values
- 📄 `utils/pinata.ts` - Code that uses the backend URL
- 📄 `vercel.json` - Vercel deployment configuration

---

For more information, see:
- [README.md](./README.md) - Main documentation
- [Backend Repository](https://github.com/ALEX-SHR-SUDO/metabackend) - Backend API documentation
