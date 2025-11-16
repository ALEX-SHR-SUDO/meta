# metabackend - SPL Token Creator Backend

Standalone Express.js backend API for the SPL Token Creator application. Handles IPFS uploads via Pinata.

## Features

- Upload token logos to IPFS
- Upload token metadata JSON to IPFS
- Secure API key management
- CORS support for frontend communication

## Prerequisites

- Node.js 18+
- Pinata API credentials

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in this directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Pinata credentials:

```
PINATA_API_KEY=your_api_key_here
PINATA_SECRET_KEY=your_secret_key_here
PORT=3001
```

## Development

```bash
npm run dev
```

Server will run on `http://localhost:3001`

## Production

```bash
npm run build
npm start
```

## API Endpoints

### POST /api/upload-image

Upload an image file to IPFS.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (File)

**Response:**
```json
{
  "uri": "https://gateway.pinata.cloud/ipfs/..."
}
```

### POST /api/upload-metadata

Upload metadata JSON to IPFS.

**Request:**
- Content-Type: `application/json`
- Body: JSON metadata object

**Response:**
```json
{
  "uri": "https://gateway.pinata.cloud/ipfs/..."
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Technology Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **File Upload**: Multer
- **IPFS Provider**: Pinata
- **HTTP Client**: Axios

## Deployment

For detailed deployment instructions, see [`DEPLOYMENT.md`](./DEPLOYMENT.md)

## Frontend Repository

This backend is used by the metafrontend application. See: https://github.com/ALEX-SHR-SUDO/metafrontend
