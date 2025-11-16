# SPL Token Creator - Backend API

Express.js backend API for the SPL Token Creator application. Handles image and metadata uploads to IPFS via Pinata.

## Features

- 📤 **Image Upload**: Upload images to IPFS via Pinata
- 📝 **Metadata Upload**: Upload JSON metadata to IPFS
- 🔒 **Secure**: API keys stored securely on the server
- 🌐 **CORS Enabled**: Accepts requests from frontend
- ✅ **Health Check**: Monitor API status

## Prerequisites

- Node.js 18+ installed
- Pinata account ([Get API keys](https://pinata.cloud))

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ALEX-SHR-SUDO/metabackend.git
cd metabackend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your Pinata API credentials:

```env
# Pinata API Keys (Required)
# Get your API keys from https://app.pinata.cloud
PINATA_API_KEY=your_pinata_api_key_here
PINATA_SECRET_KEY=your_pinata_secret_key_here

# Server Port
PORT=3001

# Node Environment
NODE_ENV=development
```

### ⚠️ IMPORTANT: Getting Pinata API Keys

1. Go to [Pinata](https://pinata.cloud) and create an account
2. Navigate to "API Keys" in your Pinata dashboard
3. Click "New Key"
4. Give it a name (e.g., "SPL Token Creator")
5. Enable permissions:
   - ✅ `pinFileToIPFS`
   - ✅ `pinJSONToIPFS`
6. Click "Create Key"
7. Copy the API Key and API Secret
8. Add them to your `.env` file

**Never commit your `.env` file or share your API keys publicly!**

## Running the Application

### Development Mode

```bash
npm run dev
```

The API will run on [http://localhost:3001](http://localhost:3001)

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok"
}
```

### Upload Image

**POST** `/api/upload-image`

Upload an image file to IPFS via Pinata.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**
```json
{
  "uri": "https://gateway.pinata.cloud/ipfs/QmX..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:3001/api/upload-image \
  -F "file=@logo.png"
```

### Upload Metadata

**POST** `/api/upload-metadata`

Upload JSON metadata to IPFS via Pinata.

**Request:**
- Content-Type: `application/json`
- Body: JSON metadata object

**Example Body:**
```json
{
  "name": "My Token",
  "symbol": "MTK",
  "description": "My awesome token",
  "image": "https://gateway.pinata.cloud/ipfs/QmX...",
  "attributes": []
}
```

**Response:**
```json
{
  "uri": "https://gateway.pinata.cloud/ipfs/QmY..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:3001/api/upload-metadata \
  -H "Content-Type: application/json" \
  -d '{"name":"My Token","symbol":"MTK","image":"https://..."}'
```

## Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **File Upload**: Multer
- **IPFS Storage**: Pinata SDK
- **HTTP Client**: Axios

## Project Structure

```
metabackend/
├── src/
│   └── server.ts       # Main Express server
├── dist/               # Compiled JavaScript (after build)
├── .env.example        # Environment variables template
├── .env                # Your environment variables (not committed)
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Deployment to Render

### Prerequisites
- Render account ([Sign up](https://render.com))
- Your Pinata API keys

### Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - **Name**: `metabackend` (or your preferred name)
   - **Region**: Choose your preferred region
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install --include=dev && npm run build`
   - **Start Command**: `npm start`

4. **Configure Environment Variables**
   
   Add these in Render service settings:
   ```
   PORT=10000
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Your backend will be available at `https://your-app.onrender.com`

6. **Update Frontend**
   - Copy your Render backend URL
   - Update `NEXT_PUBLIC_BACKEND_URL` in your frontend deployment
   - Redeploy the frontend

### Alternative: Using render.yaml

You can also use the included `render.yaml` file for automatic deployment:

```yaml
services:
  - type: web
    name: metabackend
    runtime: node
    buildCommand: npm install --include=dev && npm run build
    startCommand: npm start
    envVars:
      - key: PORT
        value: 10000
      - key: PINATA_API_KEY
        sync: false
      - key: PINATA_SECRET_KEY
        sync: false
```

## CORS Configuration

By default, the backend accepts requests from any origin:

```typescript
app.use(cors());
```

For production, you may want to restrict this to your frontend domain only. Edit `src/server.ts`:

```typescript
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

## Security Best Practices

- ✅ Never commit your `.env` file
- ✅ Keep your Pinata API keys secure
- ✅ Use environment variables for all sensitive data
- ✅ Rotate API keys regularly
- ✅ Monitor Pinata usage to detect unusual activity
- ✅ Configure CORS to allow only your frontend domain in production

## Troubleshooting

**API not starting?**
- Check that all dependencies are installed: `npm install`
- Verify your `.env` file exists and has valid values
- Check the console for error messages

**Image upload failing?**
- Verify your Pinata API keys are correct
- Check that your Pinata account is active
- Ensure the API keys have the correct permissions
- Check Pinata dashboard for quota limits

**CORS errors?**
- Verify CORS is properly configured in `src/server.ts`
- Check that your frontend URL is allowed
- Make sure the backend URL is accessible from the frontend

**Port already in use?**
- Change the `PORT` in your `.env` file
- Kill the process using the port: `lsof -ti:3001 | xargs kill`

## Monitoring

### Check API Status

```bash
curl http://localhost:3001/health
```

### View Logs (Render)
- Go to Render Dashboard
- Select your service
- Click "Logs" tab

## License

ISC

## Related Repositories

- **Frontend**: [metafrontend](https://github.com/ALEX-SHR-SUDO/metafrontend) - Next.js frontend application
