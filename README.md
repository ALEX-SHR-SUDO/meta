# SPL Token Creator with Metadata

A modern web application for creating SPL tokens on Solana blockchain with custom metadata and logo. Built with Next.js, React, Express, and Solana Web3.js.

## Features

- 🔐 **Wallet Connection**: Connect with Phantom, Solflare, and other Solana wallets
- 🖼️ **Logo Upload**: Upload token logos to IPFS via Pinata
- 👁️ **Logo Preview**: Real-time preview of uploaded logos (like oreontools.io)
- 📝 **Metadata**: Automatic metadata creation and upload
- ⛓️ **On-Chain**: Create fully compliant SPL tokens with Metaplex metadata
- 🎨 **Modern UI**: Beautiful gradient design inspired by oriontools.io

## Project Structure

This project is organized into two main folders:

```
meta/
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js app directory (pages and layouts)
│   ├── components/       # React components
│   ├── utils/            # Frontend utility functions
│   ├── package.json      # Frontend dependencies
│   └── ...
├── backend/              # Express backend API
│   ├── src/              # Backend source code
│   │   └── server.ts     # Main Express server
│   ├── api/              # API route implementations
│   ├── package.json      # Backend dependencies
│   └── ...
└── README.md             # This file
```

## Prerequisites

- Node.js 18+ installed
- A Solana wallet (e.g., Phantom)
- Pinata account for IPFS uploads ([Get API keys](https://pinata.cloud))
- SOL tokens for transaction fees (devnet SOL can be obtained from faucets)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ALEX-SHR-SUDO/meta.git
cd meta
```

### 2. Setup Backend

```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
```

Edit `backend/.env` and add your Pinata API keys:
```
PINATA_API_KEY=your_pinata_api_key_here
PINATA_SECRET_KEY=your_pinata_secret_key_here
PORT=3001
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Configure environment variables
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Running the Application

You need to run both the backend and frontend servers.

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

The backend API will run on `http://localhost:3001`

### Terminal 2: Start Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Using the Application

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Connect your Solana wallet
3. Fill in the token details:
   - Token Name
   - Token Symbol
   - Description (optional)
   - Upload Logo Image (preview will appear automatically)
   - Set Decimals (default: 9)
   - Set Initial Supply
4. Click "Create Token" and approve the transaction in your wallet
5. Wait for the token to be created and view it on Solana Explorer

## Development

### Backend

```bash
cd backend
npm run dev      # Development server with auto-reload
npm run build    # Build for production
npm start        # Start production server
```

### Frontend

```bash
cd frontend
npm run dev      # Development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

### Frontend
- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js, SPL Token, Metaplex
- **Wallet**: Solana Wallet Adapter

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Storage**: Pinata (IPFS)
- **File Upload**: Multer

## How It Works

1. **Logo Upload**: The selected image is uploaded to the backend API
2. **IPFS Upload**: Backend uploads the image to IPFS via Pinata and returns the URI
3. **Preview**: Frontend displays a real-time preview of the uploaded logo
4. **Metadata Creation**: A JSON metadata object is created with token details and logo URI
5. **Metadata Upload**: The metadata is uploaded to IPFS via the backend
6. **Token Creation**: An SPL token is created on Solana with:
   - Mint account initialization
   - Associated token account creation
   - Initial token minting
   - Off-chain metadata URI reference

## API Endpoints

### Backend API (Port 3001)

- **POST /api/upload-image**: Upload logo image to IPFS
  - Body: multipart/form-data with `file` field
  - Response: `{ uri: string }`

- **POST /api/upload-metadata**: Upload metadata JSON to IPFS
  - Body: JSON metadata object
  - Response: `{ uri: string }`

- **GET /health**: Health check endpoint
  - Response: `{ status: 'ok' }`

## Networks

The application supports multiple Solana networks:
- **devnet** (default): For testing
- **testnet**: For testing
- **mainnet-beta**: For production (requires real SOL)

Change the network in `frontend/.env.local`:
```
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

## Security

- ✅ Pinata API keys are kept secure on the backend server
- ✅ Backend and frontend are separated for better security
- ✅ Never commit your `.env` or `.env.local` files
- ✅ Keep your Pinata API keys secure
- ✅ Test on devnet before deploying to mainnet
- ✅ Verify transaction details before signing
- ✅ Secure wallet integration with industry-standard wallet adapters

## Logo Upload & Preview Feature

The application includes a user-friendly logo upload feature with real-time preview, inspired by oreontools.io:

- **Drag & Drop**: Simply drag and drop your logo image
- **File Selection**: Click to browse and select a logo file
- **Real-time Preview**: See your logo immediately after selection
- **Supported Formats**: PNG, JPG, GIF, SVG, and other image formats
- **Size Display**: Preview shows exactly how your logo will look

The preview appears as a rounded thumbnail next to the upload button, giving you instant feedback before creating your token.

## Troubleshooting

**Backend not connecting?**
- Make sure the backend server is running on port 3001
- Check that your Pinata API keys are correctly configured in `backend/.env`

**Wallet not connecting?**
- Make sure you have a Solana wallet extension installed
- Check that you're on the correct network

**Transaction failing?**
- Ensure you have enough SOL for transaction fees
- Check your network connection
- Verify you're on the correct Solana network

**Image upload failing?**
- Verify your Pinata API keys are correct in the backend
- Check that the image is a valid format (PNG, JPG, etc.)
- Ensure the image size is reasonable (< 10MB)
- Make sure the backend server is running

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

- Design inspired by [oreontools.io](https://oreontools.io) (logo upload & preview)
- Built with [Solana](https://solana.com) and [Metaplex](https://metaplex.com)
