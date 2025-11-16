# SPL Token Creator - Frontend

A modern Next.js frontend application for creating SPL tokens on Solana blockchain with custom metadata and logo upload functionality.

## Features

- 🔐 **Wallet Connection**: Connect with Phantom, Solflare, and other Solana wallets
- 🖼️ **Logo Upload**: Upload token logos via the backend API
- 👁️ **Logo Preview**: Real-time preview of uploaded logos
- 📝 **Metadata**: Automatic metadata creation and upload
- ⛓️ **On-Chain**: Create fully compliant SPL tokens with Metaplex metadata
- 🎨 **Modern UI**: Beautiful gradient design

## Prerequisites

- Node.js 18+ installed
- A Solana wallet (e.g., Phantom)
- Backend API server running (see [metabackend repository](https://github.com/ALEX-SHR-SUDO/metabackend))

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ALEX-SHR-SUDO/metafrontend.git
cd metafrontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure the following variables:

```env
# Solana Network (devnet, testnet, or mainnet-beta)
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Backend API URL - IMPORTANT: Configure this to point to your backend server
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### ⚠️ IMPORTANT: Backend URL Configuration

**The frontend needs to connect to the backend API to upload images and metadata to IPFS.**

**Where to configure the backend URL:**

1. **Development (Local)**: In `.env.local` file
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   ```

2. **Production (Deployed)**: Set in your deployment platform
   - **Vercel**: Go to Project Settings → Environment Variables
     - Variable name: `NEXT_PUBLIC_BACKEND_URL`
     - Value: Your deployed backend URL (e.g., `https://your-backend.onrender.com`)
   
3. **Code Reference**: The backend URL is used in:
   - `utils/pinata.ts` - Line 5: `const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';`

**Backend API Endpoints Used:**
- `POST /api/upload-image` - Upload logo image to IPFS
- `POST /api/upload-metadata` - Upload metadata JSON to IPFS

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will run on [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js, SPL Token, Metaplex
- **Wallet**: Solana Wallet Adapter

## Project Structure

```
metafrontend/
├── app/                # Next.js app directory (pages and layouts)
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── not-found.tsx   # 404 page
├── components/         # React components
│   ├── TokenCreator.tsx          # Main token creation form
│   └── WalletContextProvider.tsx # Wallet connection provider
├── utils/              # Utility functions
│   ├── pinata.ts       # IPFS upload functions (uses BACKEND_URL)
│   ├── solana.ts       # Solana blockchain interactions
│   └── helpers.ts      # Helper functions
├── public/             # Static assets
├── .env.example        # Environment variables template
└── package.json        # Dependencies and scripts
```

## Usage

1. **Start the backend server first** (from metabackend repository)
2. Start the frontend development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser
4. Connect your Solana wallet
5. Fill in the token details:
   - Token Name
   - Token Symbol
   - Description (optional)
   - Upload Logo Image (preview will appear automatically)
   - Set Decimals (default: 9)
   - Set Initial Supply
6. Click "Create Token" and approve the transaction in your wallet
7. Wait for the token to be created and view it on Solana Explorer

## Deployment to Vercel

### Prerequisites
- Vercel account
- Backend deployed (e.g., on Render)

### Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   
   In Vercel project settings, add:
   ```
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
   ```
   
   ⚠️ **Replace `https://your-backend.onrender.com` with your actual backend URL**

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be available at `https://your-app.vercel.app`

## Networks

The application supports multiple Solana networks:
- **devnet** (default): For testing
- **testnet**: For testing
- **mainnet-beta**: For production (requires real SOL)

Change the network in `.env.local`:
```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

## Troubleshooting

**Backend not connecting?**
- Verify `NEXT_PUBLIC_BACKEND_URL` is correctly configured in `.env.local`
- Make sure the backend server is running and accessible
- Check browser console for connection errors
- Verify CORS is properly configured in the backend

**Wallet not connecting?**
- Make sure you have a Solana wallet extension installed
- Check that you're on the correct network

**Transaction failing?**
- Ensure you have enough SOL for transaction fees
- Check your network connection
- Verify you're on the correct Solana network

**Image upload failing?**
- Verify the backend URL is correct
- Make sure the backend server is running
- Check that the image is a valid format (PNG, JPG, etc.)
- Ensure the image size is reasonable (< 10MB)

## License

ISC

## Related Repositories

- **Backend**: [metabackend](https://github.com/ALEX-SHR-SUDO/metabackend) - Express API for IPFS uploads
