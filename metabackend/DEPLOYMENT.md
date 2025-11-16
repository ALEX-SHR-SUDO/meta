# Backend Deployment Guide

This guide explains how to deploy the metabackend API to production.

## Overview

The metabackend is a Node.js Express API that handles IPFS uploads via Pinata. It can be deployed to various platforms, with Render.com being the recommended option.

## Prerequisites

Before deploying:

1. ✅ Pinata account with API credentials
2. ✅ GitHub repository for metabackend
3. ✅ Hosting platform account (Render, Heroku, etc.)

## Deployment Options

### Option 1: Render.com (Recommended)

Render.com offers free tier and is optimized for Node.js applications.

#### Step 1: Push to GitHub

```bash
cd metabackend
git init
git add .
git commit -m "Initial commit: Backend API"
git remote add origin https://github.com/ALEX-SHR-SUDO/metabackend.git
git push -u origin main
```

#### Step 2: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `metabackend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install --include=dev && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for production)

#### Step 3: Configure Environment Variables

In Render dashboard, go to **Environment** tab and add:

| Key | Value | Notes |
|-----|-------|-------|
| `PINATA_API_KEY` | Your Pinata API key | Required |
| `PINATA_SECRET_KEY` | Your Pinata secret key | Required |
| `PORT` | `10000` | Render default |
| `NODE_ENV` | `production` | Required |

#### Step 4: Deploy

1. Click **Create Web Service**
2. Render will automatically build and deploy
3. Wait for deployment to complete
4. Copy your service URL (e.g., `https://metabackend.onrender.com`)

#### Step 5: Test Deployment

```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{"status":"ok"}
```

### Option 2: Heroku

#### Step 1: Install Heroku CLI

```bash
npm install -g heroku
```

#### Step 2: Login and Create App

```bash
heroku login
heroku create metabackend
```

#### Step 3: Configure Environment Variables

```bash
heroku config:set PINATA_API_KEY=your_api_key
heroku config:set PINATA_SECRET_KEY=your_secret_key
heroku config:set NODE_ENV=production
```

#### Step 4: Deploy

```bash
git push heroku main
```

#### Step 5: Test

```bash
curl https://your-app.herokuapp.com/health
```

### Option 3: Railway

#### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

#### Step 2: Initialize and Deploy

```bash
railway login
railway init
railway up
```

#### Step 3: Configure Environment Variables

In Railway dashboard:
- Add `PINATA_API_KEY`
- Add `PINATA_SECRET_KEY`
- Add `NODE_ENV=production`

### Option 4: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build command: `npm install --include=dev && npm run build`
3. Configure run command: `npm start`
4. Add environment variables
5. Deploy

## Configuration Files

### render.yaml

The repository includes `render.yaml` for automated Render deployments:

```yaml
services:
  - type: web
    name: metabackend
    runtime: node
    region: oregon
    plan: free
    branch: main
    buildCommand: npm install --include=dev && npm run build
    startCommand: npm start
    envVars:
      - key: PORT
        value: 10000
      - key: PINATA_API_KEY
        sync: false
      - key: PINATA_SECRET_KEY
        sync: false
      - key: NODE_ENV
        value: production
```

This file enables "Infrastructure as Code" deployment on Render.

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PINATA_API_KEY` | Pinata API key | Yes | `abc123...` |
| `PINATA_SECRET_KEY` | Pinata secret key | Yes | `xyz789...` |
| `PORT` | Server port | No (auto) | `3001` or `10000` |
| `NODE_ENV` | Environment | Yes | `production` |

## Getting Pinata API Keys

1. Go to [Pinata.cloud](https://app.pinata.cloud/)
2. Sign up or log in
3. Navigate to **API Keys** in the dashboard
4. Click **New Key**
5. Enable permissions:
   - ✅ pinFileToIPFS
   - ✅ pinJSONToIPFS
6. Name your key (e.g., "metabackend-production")
7. Copy both API Key and API Secret
8. **Save them securely** - the secret is shown only once

## CORS Configuration

For production, you may want to restrict CORS to specific domains.

Edit `src/server.ts`:

```typescript
// Development - allow all origins
app.use(cors());

// Production - restrict origins
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'https://yourdomain.com'
  ],
  credentials: true
}));
```

Redeploy after making CORS changes.

## Health Check Endpoint

All deployments include a health check endpoint:

```
GET /health
```

Response:
```json
{"status":"ok"}
```

Use this for:
- ✅ Monitoring service health
- ✅ Uptime checks
- ✅ Load balancer health checks
- ✅ Testing deployment

## Monitoring

### Render

Render provides built-in:
- Deployment logs
- Runtime logs
- Metrics dashboard
- Automatic health checks

Access from: Dashboard → Your Service → Logs/Metrics

### Custom Monitoring

For production applications, consider:
- [Sentry](https://sentry.io/) - Error tracking
- [LogRocket](https://logrocket.com/) - Session replay
- [Datadog](https://www.datadoghq.com/) - Infrastructure monitoring
- [New Relic](https://newrelic.com/) - Application performance

## Troubleshooting

### Deployment Fails

**Symptoms**: Build or start command fails

**Solutions**:
1. Check build logs for errors
2. Verify `package.json` scripts are correct
3. Ensure all dependencies are listed
4. Check Node.js version compatibility

### Environment Variables Not Working

**Symptoms**: API returns errors about missing keys

**Solutions**:
1. Verify environment variables are set in platform
2. Check variable names match exactly (case-sensitive)
3. Restart/redeploy service after adding variables
4. Check logs for environment variable errors

### CORS Errors

**Symptoms**: Frontend gets CORS policy errors

**Solutions**:
1. Verify CORS is enabled in `src/server.ts`
2. Check allowed origins include your frontend domain
3. Ensure OPTIONS requests are handled
4. Redeploy backend after CORS changes

### High Response Times

**Symptoms**: API requests are slow

**Solutions**:
1. Choose deployment region closer to users
2. Upgrade to paid plan with better performance
3. Enable CDN for static assets
4. Consider caching strategies

### Service Sleeping (Free Tier)

**Symptoms**: First request after inactivity is slow

**Solutions**:
1. Free tier services may sleep after inactivity
2. Upgrade to paid plan to prevent sleeping
3. Use uptime monitoring to keep service awake
4. Consider [cron-job.org](https://cron-job.org/) to ping health endpoint

## Scaling

### Horizontal Scaling

For high traffic:
1. Use load balancer
2. Deploy multiple instances
3. Consider regions closer to users
4. Use CDN for static assets

### Vertical Scaling

For better performance:
1. Upgrade to higher tier plan
2. Allocate more memory/CPU
3. Enable HTTP/2
4. Use Node.js clustering

## Security Best Practices

✅ Always use HTTPS in production
✅ Store API keys in environment variables (never in code)
✅ Configure CORS to allow only trusted domains
✅ Keep dependencies updated (`npm audit`)
✅ Use rate limiting for API endpoints
✅ Monitor for suspicious activity
✅ Regularly rotate API keys

## CI/CD

### Automatic Deployments

Most platforms support automatic deployment on git push:

1. **Render**: Automatically deploys on push to `main`
2. **Heroku**: Configure GitHub integration for auto-deploy
3. **Railway**: Automatically deploys on push
4. **Vercel**: Not recommended for backend (use for frontend)

### Manual Deployments

For controlled deployments:

```bash
# Render
git push origin main
# Then manually trigger deploy in dashboard

# Heroku
git push heroku main

# Railway
railway up
```

## Production Checklist

Before going live:

- [ ] Pinata API keys configured
- [ ] Environment variables set correctly
- [ ] CORS configured for production domains
- [ ] Health check endpoint working
- [ ] HTTPS enabled
- [ ] Error monitoring configured
- [ ] Backup strategy in place
- [ ] Frontend knows backend URL
- [ ] Test image upload workflow
- [ ] Test metadata upload workflow
- [ ] Check response times
- [ ] Review security settings

## After Deployment

1. **Copy Backend URL**: Save your deployment URL (e.g., `https://metabackend.onrender.com`)
2. **Configure Frontend**: Add backend URL to frontend environment variables
3. **Test Integration**: Upload a test token to verify frontend-backend connection
4. **Monitor**: Check logs for any errors
5. **Document**: Save deployment details for team

## Frontend Integration

After deploying backend, configure frontend:

1. Go to metafrontend repository
2. Set `NEXT_PUBLIC_BACKEND_URL` environment variable
3. Value: Your backend URL from deployment
4. See frontend [`BACKEND_CONFIGURATION.md`](https://github.com/ALEX-SHR-SUDO/metafrontend/blob/main/BACKEND_CONFIGURATION.md)

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Heroku Dev Center](https://devcenter.heroku.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Pinata Documentation](https://docs.pinata.cloud/)

## Need Help?

Common issues are usually:
1. Environment variables not set correctly
2. Pinata API keys invalid or expired
3. CORS misconfiguration
4. Frontend using wrong backend URL

Check logs first - they usually show the exact error.
