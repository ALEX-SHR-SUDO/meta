# Quick Start Guide - Separated Repositories

This is a quick start guide for using the separated `metafrontend` and `metabackend` applications.

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- Node.js 18+ installed
- Pinata account with API keys ([Get free account](https://pinata.cloud))

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd metabackend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env and add your Pinata API keys:
# PINATA_API_KEY=your_key_here
# PINATA_SECRET_KEY=your_secret_here

# Start backend server
npm run dev
```

✅ Backend running on **http://localhost:3001**

### Step 2: Frontend Setup (2 minutes)

Open a new terminal:

```bash
# Navigate to frontend
cd metafrontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# The default values should work for local development:
# NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Start frontend server
npm run dev
```

✅ Frontend running on **http://localhost:3000**

### Step 3: Use the Application

1. Open http://localhost:3000 in your browser
2. Connect your Solana wallet (Phantom recommended)
3. Create your SPL token!

## 📍 Where to Configure Backend URL

The **most important** configuration when using separated applications:

### Local Development
**File**: `metafrontend/.env.local`
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### Production
**Platform**: Vercel Dashboard → Environment Variables
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

### In Code
**File**: `metafrontend/utils/pinata.ts` (Line 5)
```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
```

## 🎯 Testing the Setup

### Test Backend
```bash
curl http://localhost:3001/health
# Should return: {"status":"ok"}
```

### Test Frontend
1. Visit http://localhost:3000
2. Open browser DevTools (F12) → Network tab
3. Upload a token logo
4. Verify API calls to http://localhost:3001

## 📦 Production Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Configure environment variables:
   - `PINATA_API_KEY`
   - `PINATA_SECRET_KEY`
5. Deploy
6. **Copy your backend URL** (e.g., `https://metabackend.onrender.com`)

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Create new Project on Vercel
3. Connect GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_BACKEND_URL` = Your Render backend URL
5. Deploy

## 🔧 Common Commands

### Backend

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |

### Frontend

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🆘 Troubleshooting

### "Failed to upload image"
✅ Check that backend is running: `curl http://localhost:3001/health`
✅ Verify `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
✅ Check browser console for errors

### "CORS policy blocked"
✅ Ensure backend server is running
✅ Check CORS configuration in `metabackend/src/server.ts`

### Port already in use
✅ Backend: Change `PORT` in `metabackend/.env`
✅ Frontend: Run `npm run dev -- -p 3001` to use different port

## 📚 Full Documentation

- **General Guide**: `SEPARATION_GUIDE.md`
- **Russian Guide**: `RAZDELENIE_REPOZITORIYA.md`
- **Complete Summary**: `REPOSITORY_SPLIT_COMPLETE.md`
- **Frontend Setup**: `metafrontend/README.md`
- **Backend Config**: `metafrontend/BACKEND_CONFIGURATION.md`
- **Backend Setup**: `metabackend/README.md`
- **Backend Deploy**: `metabackend/DEPLOYMENT.md`

## 🎉 You're Ready!

Both applications are now running:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

Start creating SPL tokens on Solana! 🚀

## Next Steps

1. **For Development**: Continue working with local setup
2. **For Production**: Deploy backend → Get URL → Deploy frontend with backend URL
3. **To Separate Repos**: See `SEPARATION_GUIDE.md` for instructions on creating separate GitHub repositories

---

**Need help?** Check the full documentation files listed above.
