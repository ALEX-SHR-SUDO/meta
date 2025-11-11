# SPL Token Creator - Frontend

The frontend application for creating SPL tokens on Solana with metadata and logo support.

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js, SPL Token, Metaplex
- **Wallet**: Solana Wallet Adapter

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page with token creator
│   └── not-found.tsx       # 404 page
├── components/             # React components
│   ├── TokenCreator.tsx    # Main token creation form
│   └── WalletContextProvider.tsx  # Wallet integration
├── utils/                  # Utility functions
│   ├── pinata.ts           # IPFS upload via backend API
│   ├── solana.ts           # Solana blockchain utilities
│   └── helpers.ts          # General helper functions
├── public/                 # Static assets
├── package.json            # Dependencies
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── .env.example            # Environment variables template
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

### Logo Upload & Preview
- Real-time preview of uploaded logos
- Drag & drop or file selection
- Displays preview before IPFS upload
- Inspired by oreontools.io design

### Wallet Integration
- Support for multiple wallets (Phantom, Solflare, etc.)
- Secure transaction signing
- Network switching (devnet/mainnet)

### Token Creation
- Complete SPL token creation flow
- Metadata upload to IPFS
- On-chain metadata via Metaplex
- Transaction confirmation and explorer links

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SOLANA_NETWORK` | Solana network to use | `devnet`, `testnet`, `mainnet-beta` |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL | `http://localhost:3001` |

## Development Notes

- The frontend communicates with the backend API for IPFS uploads
- Pinata API keys are **never** exposed to the frontend
- All blockchain operations happen client-side using Solana Web3.js
- Wallet private keys never leave the user's browser

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend/`
3. Configure environment variables
4. Deploy

### Other Platforms

1. Build the application: `npm run build`
2. The output will be in `.next/` directory
3. Run `npm start` to start the production server
4. Ensure Node.js 18+ is available on your hosting platform

## Troubleshooting

**Wallet not connecting?**
- Ensure you have a Solana wallet extension installed
- Check that you're on the correct network

**Backend connection error?**
- Verify the backend is running on the configured port
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`

**Build errors?**
- Delete `.next/` and `node_modules/`
- Run `npm install` again
- Ensure all dependencies are installed

## Support

For more information, see the main [README](../README.md) in the root directory.
