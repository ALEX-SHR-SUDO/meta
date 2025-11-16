# How to Create Separate Repositories

This guide explains how to use the `metafrontend` and `metabackend` directories to create separate GitHub repositories.

## Overview

The `metafrontend` and `metabackend` directories are now complete, standalone applications ready to be moved to their own repositories. Each directory contains everything needed to run independently.

## What's Included

### metafrontend Directory
- ✅ Complete Next.js frontend application
- ✅ All dependencies (`package.json`, `package-lock.json`)
- ✅ Configuration files (`.env.example`, `.eslintrc.json`, `tsconfig.json`)
- ✅ Deployment config (`vercel.json`)
- ✅ Comprehensive documentation:
  - `README.md` - Setup and usage
  - `BACKEND_CONFIGURATION.md` - **Important:** How to configure backend URL
- ✅ `.gitignore` - Proper git ignore rules
- ✅ Successfully builds and runs ✓

### metabackend Directory
- ✅ Complete Express.js backend API
- ✅ All dependencies (`package.json`, `package-lock.json`)
- ✅ Configuration files (`.env.example`, `tsconfig.json`)
- ✅ Deployment config (`render.yaml`)
- ✅ Comprehensive documentation:
  - `README.md` - Setup and usage
  - `DEPLOYMENT.md` - Deployment guide
- ✅ `.gitignore` - Proper git ignore rules
- ✅ Successfully builds and runs ✓

## Steps to Create Separate Repositories

### Step 1: Create GitHub Repositories

1. Go to https://github.com/new
2. Create first repository:
   - **Name**: `metafrontend` (or your preferred name)
   - **Visibility**: Public or Private
   - **Do NOT** initialize with README (we already have one)
   - Click "Create repository"

3. Create second repository:
   - **Name**: `metabackend` (or your preferred name)
   - **Visibility**: Public or Private
   - **Do NOT** initialize with README (we already have one)
   - Click "Create repository"

### Step 2: Push Frontend to Its Repository

```bash
# Navigate to metafrontend directory
cd /path/to/meta/metafrontend

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Frontend application"

# Add remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/metafrontend.git

# Push to GitHub
git push -u origin main
```

### Step 3: Push Backend to Its Repository

```bash
# Navigate to metabackend directory (in a new terminal or after cd ..)
cd /path/to/meta/metabackend

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Backend API"

# Add remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/metabackend.git

# Push to GitHub
git push -u origin main
```

### Step 4: Deploy Backend

1. **Sign up for Render**: https://render.com (or use Railway, Heroku, etc.)

2. **Create New Web Service**:
   - Connect your GitHub account
   - Select the `metabackend` repository
   - Configure:
     - **Build Command**: `npm install --include=dev && npm run build`
     - **Start Command**: `npm start`
   
3. **Add Environment Variables** in Render dashboard:
   - `PINATA_API_KEY` = Your Pinata API key
   - `PINATA_SECRET_KEY` = Your Pinata secret key
   - `PORT` = 10000 (Render default)
   - `NODE_ENV` = production

4. **Deploy** and **copy the backend URL** (e.g., `https://metabackend.onrender.com`)

For detailed deployment instructions, see: `metabackend/DEPLOYMENT.md`

### Step 5: Deploy Frontend

1. **Sign up for Vercel**: https://vercel.com

2. **Import Project**:
   - Connect your GitHub account
   - Select the `metafrontend` repository

3. **Configure Environment Variables** in Vercel:
   - `NEXT_PUBLIC_BACKEND_URL` = Your backend URL from Step 4
   - `NEXT_PUBLIC_SOLANA_NETWORK` = devnet (or mainnet-beta for production)

4. **Deploy**

For detailed backend URL configuration, see: `metafrontend/BACKEND_CONFIGURATION.md`

## Local Development After Separation

### Running Backend Locally

```bash
cd metabackend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your Pinata API keys

# Start backend
npm run dev
# Backend runs on http://localhost:3001
```

### Running Frontend Locally

```bash
cd metafrontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Start frontend
npm run dev
# Frontend runs on http://localhost:3000
```

## Verification Checklist

After creating separate repositories:

### Backend Verification
- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] Deployed to hosting platform (Render/Railway/etc.)
- [ ] Environment variables configured
- [ ] Health endpoint responds: `curl https://your-backend.com/health`
- [ ] Backend URL copied for frontend configuration

### Frontend Verification
- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] Deployed to Vercel
- [ ] `NEXT_PUBLIC_BACKEND_URL` configured with backend URL
- [ ] Application loads successfully
- [ ] Can connect wallet
- [ ] Can upload logo (tests backend connection)
- [ ] Can create token

## Important Configuration

### 🔴 Most Important: Backend URL Configuration

The frontend needs to know where the backend is running. This is configured via:

**File**: `metafrontend/.env.local` (local) or Vercel Environment Variables (production)

**Variable**: `NEXT_PUBLIC_BACKEND_URL`

**Values**:
- Local: `http://localhost:3001`
- Production: `https://your-backend.onrender.com`

**See**: `metafrontend/BACKEND_CONFIGURATION.md` for complete details

## Benefits of Separation

✅ **Independent Deployment**: Deploy frontend and backend separately
✅ **Independent Development**: Different teams can work on different repos
✅ **Better Scaling**: Scale services independently
✅ **Cleaner History**: Each repo has its own git history
✅ **Optimized Hosting**: Use best platform for each service (Vercel for Next.js, Render for Node.js)
✅ **Easier Maintenance**: Update one service without affecting the other

## Directory Structure Reference

### metafrontend/ (Standalone Next.js App)
```
metafrontend/
├── app/                              # Next.js pages
├── components/                       # React components
├── utils/                            # Utility functions
│   └── pinata.ts                    # 📍 Uses BACKEND_URL
├── public/                          # Static assets
├── .env.example                     # 📍 Environment template
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies
├── vercel.json                      # Vercel deployment config
├── README.md                        # Main documentation
└── BACKEND_CONFIGURATION.md         # 📍 Backend URL guide
```

### metabackend/ (Standalone Express API)
```
metabackend/
├── src/
│   └── server.ts                    # Express server
├── dist/                            # Compiled output (after build)
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies
├── render.yaml                      # Render deployment config
├── README.md                        # Main documentation
└── DEPLOYMENT.md                    # Deployment guide
```

## Troubleshooting

### "Permission denied" when pushing to GitHub

Make sure you:
1. Have created the repository on GitHub
2. Are using the correct repository URL
3. Have proper GitHub authentication (SSH key or Personal Access Token)

### Frontend can't connect to backend

1. Check that backend is deployed and running
2. Verify `NEXT_PUBLIC_BACKEND_URL` is correctly configured
3. Test backend health: `curl https://your-backend.com/health`
4. Check CORS is enabled in backend
5. See `metafrontend/BACKEND_CONFIGURATION.md`

### Build fails

1. Test locally first: `npm run build`
2. Check all dependencies are in `package.json`
3. Verify environment variables are set
4. Check deployment platform logs

## Support

### Documentation
- Frontend setup: `metafrontend/README.md`
- Backend URL config: `metafrontend/BACKEND_CONFIGURATION.md`
- Backend setup: `metabackend/README.md`
- Backend deployment: `metabackend/DEPLOYMENT.md`

### Already Created Documentation
These comprehensive guides are already in the root directory:
- `SEPARATION_GUIDE.md` - Complete guide (English)
- `RAZDELENIE_REPOZITORIYA.md` - Complete guide (Russian)
- `REPOSITORY_SPLIT_COMPLETE.md` - Technical summary
- `QUICK_START_SEPARATED.md` - Quick start guide

## Next Steps

1. ✅ Create GitHub repositories
2. ✅ Push metafrontend to its repository
3. ✅ Push metabackend to its repository
4. ✅ Deploy backend to Render (or other platform)
5. ✅ Copy backend URL
6. ✅ Deploy frontend to Vercel with backend URL configured
7. ✅ Test the application
8. ✅ Start developing independently!

---

**Status**: Both directories are ready for separation! 🚀

Each directory is a complete, working application that can be immediately pushed to its own repository and deployed.
