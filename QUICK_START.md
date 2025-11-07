# Quick Start Guide

This guide will help you quickly set up and run the SPL Token Creator with the new frontend/backend structure.

## Prerequisites

- Node.js 18+ installed
- A Solana wallet browser extension (e.g., Phantom)
- Pinata account with API keys ([Get free account](https://pinata.cloud))

## Step 1: Install Dependencies

```bash
# Install frontend dependencies (from root directory)
cd /path/to/meta
npm install

# Install backend dependencies
cd backend
npm install
```

## Step 2: Configure Environment Variables

### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PINATA_API_KEY=your_actual_pinata_api_key
PINATA_SECRET_KEY=your_actual_pinata_secret_key
PORT=3001
```

### Frontend Configuration

```bash
cd ..  # Back to root
cp .env.example .env.local
```

Edit `.env.local` at the root:
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Step 3: Run the Application

You need TWO terminal windows:

### Terminal 1: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
Backend server running on http://localhost:3001
```

### Terminal 2: Start Frontend

```bash
# From root directory
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
```

## Step 4: Use the Application

1. Open your browser to http://localhost:3000
2. Click "Connect Wallet" and connect your Solana wallet
3. Fill in the token details:
   - **Token Name**: e.g., "My Token"
   - **Token Symbol**: e.g., "MTK"
   - **Description**: Optional description
   - **Token Logo**: Click to upload - you'll see a preview immediately!
   - **Decimals**: Usually 9 (default)
   - **Initial Supply**: How many tokens to create

4. Click "Create Token"
5. Approve the transaction in your wallet
6. Wait for confirmation
7. View your new token on Solana Explorer!

## Key Features Explained

### Logo Upload & Preview 🖼️

When you select a logo file:
1. A preview appears instantly on the left
2. You can see exactly how your logo will look
3. The filename is displayed in the button
4. No upload happens until you click "Create Token"

This feature is inspired by oreontools.io for better UX!

### Backend API 🔐

The backend securely handles:
- Image uploads to IPFS via Pinata
- Metadata JSON uploads to IPFS
- API key management (never exposed to frontend)

### Frontend UI 🎨

Beautiful gradient design with:
- Glassmorphism effects
- Smooth animations
- Wallet connection integration
- Real-time status updates

## Project Structure

```
meta/
├── app/                   # Next.js pages and layouts
├── components/            # React components
├── utils/                 # Frontend utilities
├── backend/               # Express API
│   └── src/               # Server code
├── package.json           # Frontend dependencies
└── README.md              # Full documentation
```

## Common Commands

### Frontend (from root directory)

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # Run linter
```

### Backend

```bash
cd backend
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
```

## Troubleshooting

### Backend won't start
- Check that port 3001 is not in use
- Verify your Pinata API keys are correct in `backend/.env`

### Frontend can't connect to backend
- Make sure backend is running on port 3001
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local` at the root

### Wallet won't connect
- Install a Solana wallet extension (Phantom recommended)
- Make sure you're on the correct network (devnet/mainnet)

### Transaction fails
- Ensure you have SOL in your wallet for fees
- Devnet SOL: https://faucet.solana.com

### Logo upload fails
- Check backend server is running
- Verify Pinata API keys are valid
- Ensure image is < 10MB

## Production Deployment

### Backend
1. Build: `npm run build`
2. Set environment variables on your hosting service
3. Deploy the `dist/` folder
4. Ensure port 3001 is accessible

### Frontend
1. Update `NEXT_PUBLIC_BACKEND_URL` to your backend URL
2. Build: `npm run build`
3. Deploy using Vercel, Netlify, or any Node.js host

## Support

- GitHub Issues: https://github.com/ALEX-SHR-SUDO/meta/issues
- Solana Docs: https://docs.solana.com
- Pinata Docs: https://docs.pinata.cloud

## Summary of Changes

This restructure provides:
- ✅ Clear separation of frontend and backend code
- ✅ Better security (API keys on backend only)
- ✅ Easier development (independent servers)
- ✅ Better organization (monorepo structure)
- ✅ Logo upload with real-time preview (like oreontools.io)
- ✅ Comprehensive documentation

Enjoy creating your Solana tokens! 🚀
