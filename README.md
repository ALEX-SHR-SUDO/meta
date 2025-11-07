# SPL Token Creator with Metadata

A modern web application for creating SPL tokens on Solana blockchain with custom metadata and logo. Built with Next.js, React, and Solana Web3.js.

## Features

- 🔐 **Wallet Connection**: Connect with Phantom, Solflare, and other Solana wallets
- 🖼️ **Logo Upload**: Upload token logos to IPFS via Pinata
- 📝 **Metadata**: Automatic metadata creation and upload
- ⛓️ **On-Chain**: Create fully compliant SPL tokens with Metaplex metadata
- 🎨 **Modern UI**: Beautiful gradient design inspired by oriontools.io

## Prerequisites

- Node.js 18+ installed
- A Solana wallet (e.g., Phantom)
- Pinata account for IPFS uploads ([Get API keys](https://pinata.cloud))
- SOL tokens for transaction fees (devnet SOL can be obtained from faucets)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ALEX-SHR-SUDO/meta.git
cd meta
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Pinata API keys:
```
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key_here
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key_here
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Connect your Solana wallet

4. Fill in the token details:
   - Token Name
   - Token Symbol
   - Description (optional)
   - Upload Logo Image
   - Set Decimals (default: 9)
   - Set Initial Supply

5. Click "Create Token" and approve the transaction in your wallet

6. Wait for the token to be created and view it on Solana Explorer

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js, SPL Token, Metaplex
- **Storage**: Pinata (IPFS)
- **Wallet**: Solana Wallet Adapter

## Project Structure

```
meta/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with wallet provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── TokenCreator.tsx   # Main token creation form
│   └── WalletContextProvider.tsx  # Wallet context
├── utils/                 # Utility functions
│   ├── pinata.ts          # Pinata IPFS utilities
│   └── solana.ts          # Solana token utilities
├── public/                # Static assets
└── package.json           # Dependencies
```

## How It Works

1. **Logo Upload**: The selected image is uploaded to IPFS via Pinata API
2. **Metadata Creation**: A JSON metadata object is created with token details and logo URI
3. **Metadata Upload**: The metadata is uploaded to IPFS and returns a URI
4. **Token Creation**: An SPL token is created on Solana with:
   - Mint account initialization
   - Associated token account creation
   - Initial token minting
   - Metaplex metadata account creation with the metadata URI

## Networks

The application supports multiple Solana networks:
- **devnet** (default): For testing
- **testnet**: For testing
- **mainnet-beta**: For production (requires real SOL)

Change the network in `.env.local`:
```
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

## Security

- Never commit your `.env.local` file
- Keep your Pinata API keys secure
- Test on devnet before deploying to mainnet
- Verify transaction details before signing

## Troubleshooting

**Wallet not connecting?**
- Make sure you have a Solana wallet extension installed
- Check that you're on the correct network

**Transaction failing?**
- Ensure you have enough SOL for transaction fees
- Check your network connection
- Verify you're on the correct Solana network

**Image upload failing?**
- Verify your Pinata API keys are correct
- Check that the image is a valid format (PNG, JPG, etc.)
- Ensure the image size is reasonable (< 10MB)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

- Design inspired by [oriontools.io](https://oriontools.io)
- Built with [Solana](https://solana.com) and [Metaplex](https://metaplex.com)
