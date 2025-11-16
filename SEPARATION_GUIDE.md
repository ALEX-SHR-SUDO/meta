# Repository Separation Guide

This guide explains how the SPL Token Creator project has been separated into two independent repositories for better maintainability and deployment.

## Overview

The original monorepo structure has been split into two separate repositories:

1. **metafrontend** - Next.js frontend application
2. **metabackend** - Express.js backend API

## Why Separate Repositories?

### Benefits:

✅ **Independent Deployment**: Deploy frontend and backend separately
✅ **Better Organization**: Clear separation of concerns
✅ **Easier Maintenance**: Work on each part independently
✅ **Flexible Hosting**: Use different hosting platforms optimally
✅ **Cleaner Git History**: Each repo has its own commit history
✅ **Team Collaboration**: Different teams can work on different repos

### Use Cases:

- Deploy frontend to Vercel (optimized for Next.js)
- Deploy backend to Render (better for Node.js APIs)
- Scale each service independently
- Update frontend without affecting backend
- Update backend without redeploying frontend

## Repository Structure

### Original Monorepo (Before)

```
meta/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── utils/
│   └── package.json
├── backend/
│   ├── src/
│   └── package.json
├── package.json (monorepo scripts)
└── README.md
```

### Separated Repositories (After)

#### Repository 1: metafrontend

```
metafrontend/
├── app/                          # Next.js pages
├── components/                   # React components
├── utils/                        # Utility functions
│   └── pinata.ts                # 📍 Backend URL configured here
├── .env.example                  # 📍 Backend URL template
├── package.json
├── README.md
├── BACKEND_CONFIGURATION.md      # 📍 Configuration guide
└── vercel.json                   # Vercel deployment config
```

**GitHub**: `https://github.com/ALEX-SHR-SUDO/metafrontend`

#### Repository 2: metabackend

```
metabackend/
├── src/
│   └── server.ts                 # Express server
├── .env.example                  # Environment template
├── package.json
├── README.md
├── DEPLOYMENT.md                 # Deployment guide
└── render.yaml                   # Render deployment config
```

**GitHub**: `https://github.com/ALEX-SHR-SUDO/metabackend`

## How to Use the Separated Repositories

### Option 1: Clone Both Repositories (Local Development)

#### Step 1: Clone and Setup Backend

```bash
# Clone backend repository
git clone https://github.com/ALEX-SHR-SUDO/metabackend.git
cd metabackend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your Pinata API keys

# Start backend
npm run dev
# Backend runs on http://localhost:3001
```

#### Step 2: Clone and Setup Frontend

```bash
# Clone frontend repository (in a different directory)
git clone https://github.com/ALEX-SHR-SUDO/metafrontend.git
cd metafrontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Start frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### Option 2: Deploy Separately (Production)

#### Step 1: Deploy Backend to Render

```bash
# From metabackend directory
git push origin main
```

1. Connect repository to Render
2. Configure environment variables (Pinata keys)
3. Deploy
4. **Copy your backend URL** (e.g., `https://metabackend.onrender.com`)

See detailed instructions: `metabackend/DEPLOYMENT.md`

#### Step 2: Deploy Frontend to Vercel

```bash
# From metafrontend directory
git push origin main
```

1. Connect repository to Vercel
2. Configure environment variables:
   - `NEXT_PUBLIC_BACKEND_URL=https://metabackend.onrender.com`
3. Deploy

See detailed instructions: `metafrontend/README.md`

## 📍 Where to Configure Backend URL

This is the most important configuration when using separated repositories.

### Configuration Locations:

#### 1. Frontend Environment Variable

**File**: `metafrontend/.env.local` (development)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**Platform**: Vercel Dashboard → Environment Variables (production)

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

#### 2. Code Reference

**File**: `metafrontend/utils/pinata.ts`

**Line 5**:
```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
```

This is where the frontend reads the backend URL and uses it for API calls.

#### 3. API Endpoints

The frontend makes requests to:
- `${BACKEND_URL}/api/upload-image` - Upload logo to IPFS
- `${BACKEND_URL}/api/upload-metadata` - Upload metadata to IPFS

### Quick Configuration Guide:

| Environment | Configuration Method | Example Value |
|-------------|---------------------|---------------|
| **Local Development** | `.env.local` file | `http://localhost:3001` |
| **Production** | Vercel Environment Variables | `https://metabackend.onrender.com` |
| **Testing** | `.env.local` file | `https://staging-backend.onrender.com` |

📖 **Detailed Guide**: See `metafrontend/BACKEND_CONFIGURATION.md`

## Migration Steps

If you're migrating from the monorepo to separated repositories:

### Step 1: Create GitHub Repositories

```bash
# Create two new repositories on GitHub:
# 1. metafrontend
# 2. metabackend
```

### Step 2: Push Frontend

```bash
cd /path/to/metafrontend
git init
git add .
git commit -m "Initial commit: Frontend application"
git remote add origin https://github.com/ALEX-SHR-SUDO/metafrontend.git
git push -u origin main
```

### Step 3: Push Backend

```bash
cd /path/to/metabackend
git init
git add .
git commit -m "Initial commit: Backend API"
git remote add origin https://github.com/ALEX-SHR-SUDO/metabackend.git
git push -u origin main
```

### Step 4: Configure and Deploy

1. Deploy backend first
2. Get backend URL
3. Configure frontend with backend URL
4. Deploy frontend
5. Test the application

## Testing the Setup

### Local Testing

1. **Start Backend**:
   ```bash
   cd metabackend
   npm run dev
   ```

2. **Test Backend Health**:
   ```bash
   curl http://localhost:3001/health
   # Should return: {"status":"ok"}
   ```

3. **Start Frontend**:
   ```bash
   cd metafrontend
   npm run dev
   ```

4. **Test Application**:
   - Open http://localhost:3000
   - Connect wallet
   - Try uploading a logo
   - Check browser console for API calls

### Production Testing

1. **Test Backend**:
   ```bash
   curl https://your-backend.onrender.com/health
   ```

2. **Test Frontend**:
   - Visit your Vercel URL
   - Open browser DevTools → Network tab
   - Try uploading a logo
   - Verify API calls go to your backend URL

## Environment Variables Reference

### Frontend (.env.local)

```env
# Required
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Production
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_BACKEND_URL=https://metabackend.onrender.com
```

### Backend (.env)

```env
# Required
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
PORT=3001
NODE_ENV=development

# Production
PORT=10000
NODE_ENV=production
```

## Troubleshooting

### Frontend Can't Connect to Backend

❌ **Error**: "Failed to upload image"

✅ **Solutions**:
1. Check `NEXT_PUBLIC_BACKEND_URL` is correctly set
2. Verify backend is running: `curl http://localhost:3001/health`
3. Check browser console for exact error
4. Verify CORS is enabled in backend

### CORS Errors

❌ **Error**: "CORS policy blocked"

✅ **Solutions**:
1. Ensure backend has `cors()` middleware enabled
2. For production, configure allowed origins in `metabackend/src/server.ts`
3. Redeploy backend after CORS changes

### Backend URL Not Updating

❌ **Problem**: Frontend still using old backend URL

✅ **Solutions**:
1. Clear Next.js cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Restart dev server: `npm run dev`
4. Check environment variables are loaded

## Maintenance

### Updating Frontend

```bash
cd metafrontend
git pull origin main
npm install  # if package.json changed
npm run dev
```

### Updating Backend

```bash
cd metabackend
git pull origin main
npm install  # if package.json changed
npm run dev
```

### Deploying Updates

**Backend** (Render auto-deploys on push):
```bash
cd metabackend
git add .
git commit -m "Update: description"
git push origin main
```

**Frontend** (Vercel auto-deploys on push):
```bash
cd metafrontend
git add .
git commit -m "Update: description"
git push origin main
```

## Documentation Reference

### Frontend Documentation
- 📄 `metafrontend/README.md` - Main documentation
- 📄 `metafrontend/BACKEND_CONFIGURATION.md` - Backend URL configuration guide
- 📄 `metafrontend/.env.example` - Environment template

### Backend Documentation
- 📄 `metabackend/README.md` - Main documentation
- 📄 `metabackend/DEPLOYMENT.md` - Deployment guide
- 📄 `metabackend/.env.example` - Environment template

## Summary

### Quick Reference:

| Task | Command | Repository |
|------|---------|------------|
| Clone frontend | `git clone https://github.com/ALEX-SHR-SUDO/metafrontend.git` | metafrontend |
| Clone backend | `git clone https://github.com/ALEX-SHR-SUDO/metabackend.git` | metabackend |
| Configure backend URL | Edit `.env.local` | metafrontend |
| Set Pinata keys | Edit `.env` | metabackend |
| Run backend | `npm run dev` | metabackend |
| Run frontend | `npm run dev` | metafrontend |
| Deploy backend | Push to GitHub → Render auto-deploys | metabackend |
| Deploy frontend | Push to GitHub → Vercel auto-deploys | metafrontend |

### Important Files:

| File | Purpose | Location |
|------|---------|----------|
| `.env.local` | Frontend environment config | metafrontend |
| `.env` | Backend environment config | metabackend |
| `utils/pinata.ts` | Uses backend URL | metafrontend |
| `BACKEND_CONFIGURATION.md` | Configuration guide | metafrontend |
| `DEPLOYMENT.md` | Backend deployment guide | metabackend |

---

## Need Help?

- Frontend setup: See `metafrontend/README.md`
- Backend setup: See `metabackend/README.md`
- Backend URL configuration: See `metafrontend/BACKEND_CONFIGURATION.md`
- Backend deployment: See `metabackend/DEPLOYMENT.md`

**The two repositories are now independent and ready to use! 🚀**
