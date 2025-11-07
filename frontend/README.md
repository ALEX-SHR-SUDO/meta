# Meta Frontend

Next.js frontend application for the SPL Token Creator. Create SPL tokens on Solana with custom metadata and logos.

## Features

- Wallet connection (Phantom, Solflare, etc.)
- Token creation form with validation
- Logo upload with real-time preview
- Token metadata creation
- SPL token minting on Solana
- Beautiful gradient UI inspired by oreontools.io

## Prerequisites

- Node.js 18+
- A Solana wallet browser extension
- Backend server running on port 3001

## Installation

```bash
npm install
```

## Configuration

Create a `.env.local` file in this directory:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Development

```bash
npm run dev
```

Application will run on `http://localhost:3000`

Make sure the backend server is running before starting the frontend.

## Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── api/               # API route handlers (proxies to backend)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── TokenCreator.tsx   # Main token creation form
│   └── WalletContextProvider.tsx
└── utils/                 # Utility functions
    ├── pinata.ts          # IPFS upload helpers
    ├── solana.ts          # Solana blockchain utilities
    └── helpers.ts         # General helpers
```

## Logo Upload & Preview

The application features a user-friendly logo upload system:

1. Click the upload area or drag & drop an image
2. See instant preview of your logo
3. Preview displays as a rounded thumbnail
4. Supported formats: PNG, JPG, GIF, SVG, etc.

This feature is inspired by oreontools.io for a better user experience.

## Technology Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: 
  - @solana/web3.js
  - @solana/spl-token
  - @metaplex-foundation/mpl-token-metadata
- **Wallet**: Solana Wallet Adapter
