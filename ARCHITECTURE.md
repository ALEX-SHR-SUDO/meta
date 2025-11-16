# Architecture - Separated Repositories

## Overview

This document provides a visual overview of the separated repository architecture.

## Repository Structure

### Before (Monorepo)
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
└── package.json (monorepo scripts)
```

### After (Separated)
```
Repository 1: metafrontend/                Repository 2: metabackend/
├── app/                                    ├── src/
│   ├── layout.tsx                          │   └── server.ts
│   ├── page.tsx                            ├── dist/ (after build)
│   └── not-found.tsx                       │   └── server.js
├── components/                             ├── .env.example
│   ├── TokenCreator.tsx                    ├── .gitignore
│   └── WalletContextProvider.tsx           ├── package.json
├── utils/                                  ├── tsconfig.json
│   ├── pinata.ts  ← Uses BACKEND_URL      ├── render.yaml
│   ├── solana.ts                           ├── README.md
│   └── helpers.ts                          └── DEPLOYMENT.md
├── public/
├── .env.example  ← Backend URL config
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json
├── README.md
└── BACKEND_CONFIGURATION.md
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 1. Visits website
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    metafrontend (Vercel)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js Application                        │ │
│  │  • React components                                     │ │
│  │  • Wallet integration                                   │ │
│  │  • User interface                                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Environment Variable:                                       │
│  NEXT_PUBLIC_BACKEND_URL=https://metabackend.onrender.com   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 2. Upload image/metadata
                 │ POST /api/upload-image
                 │ POST /api/upload-metadata
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    metabackend (Render)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Express.js API                             │ │
│  │  • Image upload handling                                │ │
│  │  • Metadata upload handling                             │ │
│  │  • CORS configuration                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Environment Variables:                                      │
│  PINATA_API_KEY=xxx                                         │
│  PINATA_SECRET_KEY=xxx                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 3. Upload to IPFS
                 │ Pinata API calls
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      Pinata / IPFS                           │
│  • Stores images                                             │
│  • Stores metadata JSON                                      │
│  • Returns IPFS URIs                                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 4. IPFS URI returned
                 ▼
                Frontend
                 │
                 │ 5. Create token with metadata URI
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                     Solana Blockchain                        │
│  • Create SPL token mint                                     │
│  • Add Metaplex metadata                                     │
│  • Mint initial supply                                       │
└─────────────────────────────────────────────────────────────┘
```

## Configuration Flow

### Development Environment

```
Developer Machine
├── Terminal 1: metabackend/
│   ├── .env
│   │   ├── PINATA_API_KEY=xxx
│   │   ├── PINATA_SECRET_KEY=xxx
│   │   └── PORT=3001
│   └── npm run dev → http://localhost:3001
│
└── Terminal 2: metafrontend/
    ├── .env.local
    │   ├── NEXT_PUBLIC_SOLANA_NETWORK=devnet
    │   └── NEXT_PUBLIC_BACKEND_URL=http://localhost:3001 ← Points to Terminal 1
    └── npm run dev → http://localhost:3000
```

### Production Environment

```
Internet
    │
    ├─→ Frontend (Vercel)
    │   ├── Environment Variables:
    │   │   ├── NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
    │   │   └── NEXT_PUBLIC_BACKEND_URL=https://metabackend.onrender.com
    │   └── https://metafrontend.vercel.app
    │
    └─→ Backend (Render)
        ├── Environment Variables:
        │   ├── PINATA_API_KEY=xxx
        │   ├── PINATA_SECRET_KEY=xxx
        │   └── PORT=10000
        └── https://metabackend.onrender.com
```

## API Communication

### Frontend → Backend

```typescript
// metafrontend/utils/pinata.ts

// Configuration
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

// Upload Image
fetch(`${BACKEND_URL}/api/upload-image`, {
  method: 'POST',
  body: formData
})

// Upload Metadata
fetch(`${BACKEND_URL}/api/upload-metadata`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(metadata)
})
```

### Backend Endpoints

```typescript
// metabackend/src/server.ts

// Health Check
GET /health
→ { status: 'ok' }

// Upload Image
POST /api/upload-image
Request: multipart/form-data (file)
Response: { uri: 'https://gateway.pinata.cloud/ipfs/Qm...' }

// Upload Metadata
POST /api/upload-metadata
Request: JSON metadata object
Response: { uri: 'https://gateway.pinata.cloud/ipfs/Qm...' }
```

## Deployment Architecture

```
GitHub
├── Repository: metafrontend
│   └── Push → Vercel (auto-deploy)
│       ├── Build: npm run build
│       └── Deploy: https://metafrontend.vercel.app
│
└── Repository: metabackend
    └── Push → Render (auto-deploy)
        ├── Build: npm run build
        └── Deploy: https://metabackend.onrender.com
```

## Technology Stack

### metafrontend
```
┌─────────────────────────────────┐
│        Next.js 16               │
├─────────────────────────────────┤
│        React 19                 │
├─────────────────────────────────┤
│        TypeScript               │
├─────────────────────────────────┤
│      Tailwind CSS               │
├─────────────────────────────────┤
│    Solana Web3.js               │
├─────────────────────────────────┤
│   Wallet Adapter                │
├─────────────────────────────────┤
│      Metaplex                   │
└─────────────────────────────────┘
```

### metabackend
```
┌─────────────────────────────────┐
│        Express.js               │
├─────────────────────────────────┤
│        TypeScript               │
├─────────────────────────────────┤
│       Pinata SDK                │
├─────────────────────────────────┤
│         Multer                  │
├─────────────────────────────────┤
│          CORS                   │
└─────────────────────────────────┘
```

## Security Model

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│  • No API keys stored                                   │
│  • Only knows backend URL                               │
│  • Wallet private keys in browser extension            │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 metafrontend (Public)                    │
│  • NEXT_PUBLIC_BACKEND_URL (public)                     │
│  • NEXT_PUBLIC_SOLANA_NETWORK (public)                  │
│  • No secrets stored                                    │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 metabackend (Private)                    │
│  • PINATA_API_KEY (secret, server-only)                 │
│  • PINATA_SECRET_KEY (secret, server-only)              │
│  • Environment variables never exposed to client        │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      Pinata API                          │
│  • Receives authenticated requests from backend only    │
│  • Stores files on IPFS                                 │
│  • Returns public IPFS URIs                             │
└─────────────────────────────────────────────────────────┘
```

## Key Benefits of Separation

### 1. Independent Scaling
```
High Traffic → Scale Frontend (Vercel)
Many Uploads → Scale Backend (Render)
```

### 2. Independent Deployment
```
Frontend Update → Deploy only frontend
Backend Update → Deploy only backend
No downtime for either service
```

### 3. Better Security
```
API Keys → Backend only (server-side)
Public URLs → Frontend (client-side)
Clear separation of concerns
```

### 4. Flexible Hosting
```
Frontend → Vercel (optimized for Next.js)
Backend → Render (optimized for Node.js)
Each on optimal platform
```

## Summary

The separated architecture provides:

✅ **Independence** - Each app works standalone
✅ **Flexibility** - Deploy to different platforms
✅ **Security** - API keys protected on backend
✅ **Scalability** - Scale frontend and backend independently
✅ **Maintainability** - Clear separation of concerns
✅ **Documentation** - Comprehensive guides for each part

---

For implementation details, see:
- `SEPARATION_GUIDE.md` - Complete separation guide
- `metafrontend/BACKEND_CONFIGURATION.md` - Backend URL configuration
- `metabackend/DEPLOYMENT.md` - Backend deployment guide
