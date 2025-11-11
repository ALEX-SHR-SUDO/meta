# Deployment Guide

This guide explains how to deploy the frontend to Vercel and the backend to Render.

## Frontend Deployment (Vercel)

### Prerequisites
- A [Vercel](https://vercel.com) account
- Your repository connected to Vercel

### Steps

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

3. **Configure Environment Variables**
   
   Add the following environment variables in Vercel project settings:
   
   ```
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-app.onrender.com
   ```
   
   **Important**: Replace `https://your-backend-app.onrender.com` with your actual Render backend URL after deploying the backend.

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend
   - Your frontend will be available at `https://your-app.vercel.app`

### Automatic Deployments
- Vercel will automatically deploy when you push to your main branch
- Pull requests will create preview deployments

## Backend Deployment (Render)

### Prerequisites
- A [Render](https://render.com) account
- Your repository connected to Render

### Steps

1. **Connect Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   
   Render will detect the `render.yaml` configuration file automatically, or you can configure manually:
   
   - **Name**: `meta-backend` (or your preferred name)
   - **Region**: Choose your preferred region (e.g., Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Configure Environment Variables**
   
   Add the following environment variables in Render service settings:
   
   ```
   PORT=10000
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key
   NODE_ENV=production
   ```
   
   **Important**: Get your Pinata API keys from [Pinata Dashboard](https://app.pinata.cloud)

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Your backend will be available at `https://your-app.onrender.com`

### Automatic Deployments
- Render will automatically deploy when you push to your main branch

## Post-Deployment Steps

1. **Update Frontend Environment Variable**
   - Go to Vercel project settings
   - Update `NEXT_PUBLIC_BACKEND_URL` with your Render backend URL
   - Redeploy the frontend

2. **Test the Deployment**
   - Visit your Vercel frontend URL
   - Test wallet connection
   - Test token creation with logo upload
   - Verify that images are uploaded to IPFS via the backend

3. **Configure Custom Domain** (Optional)
   - **Vercel**: Go to project settings → Domains
   - **Render**: Go to service settings → Custom Domains

## Network Configuration

### For Development/Testing (Devnet)
```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### For Production (Mainnet)
```
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

**Warning**: Make sure you have sufficient SOL for transaction fees when using mainnet.

## CORS Configuration

The backend is already configured to accept requests from any origin using `cors()`. In production, you may want to restrict this to your frontend domain only:

```typescript
app.use(cors({
  origin: 'https://your-app.vercel.app'
}));
```

## Monitoring and Logs

### Vercel
- View logs in the Vercel Dashboard → Deployments → Function Logs
- Monitor performance in the Analytics tab

### Render
- View logs in the Render Dashboard → Your Service → Logs
- Monitor performance in the Metrics tab

## Troubleshooting

### Frontend Issues

**Build Fails**
- Check that all dependencies are correctly listed in `frontend/package.json`
- Verify that environment variables are set correctly
- Check build logs in Vercel Dashboard

**Backend Not Connecting**
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Check that the backend URL is accessible
- Verify CORS is configured correctly

### Backend Issues

**Build Fails**
- Check that all dependencies are correctly listed in `backend/package.json`
- Verify TypeScript compiles correctly
- Check build logs in Render Dashboard

**Pinata Upload Fails**
- Verify `PINATA_API_KEY` and `PINATA_SECRET_KEY` are set correctly
- Check that your Pinata account is active
- Verify the API keys have the correct permissions

**Service Not Accessible**
- Check that the service is running in Render Dashboard
- Verify the start command is correct
- Check logs for errors

## Cost Considerations

### Vercel
- **Hobby Plan**: Free for personal projects
- Includes automatic HTTPS, CDN, and unlimited bandwidth

### Render
- **Free Plan**: Available with limitations
  - Services may spin down after inactivity (cold starts)
  - Limited compute resources
- **Paid Plans**: Starting at $7/month for always-on services

## Security Best Practices

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly
4. **Monitor usage** to detect unusual activity
5. **Test on devnet** before deploying to mainnet
6. **Review transactions** before signing in production

## Updating Deployments

### Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel will automatically redeploy.

### Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render will automatically redeploy.

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Render Documentation**: https://render.com/docs
- **Solana Documentation**: https://docs.solana.com
- **Pinata Documentation**: https://docs.pinata.cloud
