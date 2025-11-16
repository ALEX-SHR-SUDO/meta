# Backend Deployment Guide

This guide explains how to deploy the metabackend API to production.

## Deployment Platforms

This backend can be deployed to any Node.js hosting platform. We recommend:
- **Render** (recommended) - Free tier available
- **Railway** - Easy deployment
- **Heroku** - Popular choice
- **DigitalOcean App Platform** - More control
- **AWS EC2** - Full control

This guide focuses on **Render** deployment.

## Prerequisites

- GitHub account with metabackend repository
- Render account ([Sign up here](https://render.com))
- Pinata API keys ([Get them here](https://app.pinata.cloud))

## Deployment to Render

### Method 1: Using render.yaml (Automatic)

This repository includes a `render.yaml` configuration file for automatic deployment.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub account
   - Select your `metabackend` repository
   - Render will detect the `render.yaml` file

3. **Configure Environment Variables**
   
   Render will prompt you to set these environment variables:
   - `PINATA_API_KEY` - Your Pinata API key
   - `PINATA_SECRET_KEY` - Your Pinata secret key
   
   (PORT and NODE_ENV are already configured in render.yaml)

4. **Deploy**
   - Click "Apply"
   - Render will build and deploy your backend
   - Wait for deployment to complete (~2-3 minutes)

5. **Get Your Backend URL**
   - After deployment, you'll see your service URL
   - It will look like: `https://metabackend.onrender.com`
   - **Copy this URL** - you'll need it for frontend configuration

### Method 2: Manual Configuration

If you prefer manual configuration:

#### Steps:

1. **Create Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service Settings**
   
   **Basic Settings:**
   - **Name**: `metabackend` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., Oregon)
   - **Branch**: `main`
   - **Runtime**: `Node`
   
   **Build Settings:**
   - **Build Command**: `npm install --include=dev && npm run build`
   - **Start Command**: `npm start`

3. **Configure Environment Variables**
   
   Add the following environment variables:
   
   | Variable | Value | Description |
   |----------|-------|-------------|
   | `PORT` | `10000` | Render's default port |
   | `PINATA_API_KEY` | Your API key | From Pinata dashboard |
   | `PINATA_SECRET_KEY` | Your secret key | From Pinata dashboard |
   | `NODE_ENV` | `production` | Environment mode |

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment (~2-3 minutes)

5. **Verify Deployment**
   - Your service URL will be shown in the dashboard
   - Test the health endpoint: `https://your-service.onrender.com/health`
   - You should see: `{"status":"ok"}`

## Post-Deployment Configuration

### Update Frontend

After deploying the backend, you need to update the frontend to use your backend URL.

1. **Copy your backend URL** from Render (e.g., `https://metabackend.onrender.com`)

2. **Update Frontend Environment Variable**:
   - If using Vercel:
     - Go to Vercel project settings
     - Navigate to Environment Variables
     - Update `NEXT_PUBLIC_BACKEND_URL` to your backend URL
     - Redeploy the frontend

3. **Test the connection**:
   - Visit your frontend
   - Try uploading a token logo
   - Check that it successfully uploads via your backend

## Environment Variables Reference

### Required Variables

```env
# Pinata API Credentials (Required)
PINATA_API_KEY=your_pinata_api_key_here
PINATA_SECRET_KEY=your_pinata_secret_key_here

# Server Configuration
PORT=10000
NODE_ENV=production
```

### Getting Pinata API Keys

1. Go to [Pinata](https://app.pinata.cloud)
2. Sign in or create an account
3. Navigate to "API Keys" section
4. Click "New Key"
5. Set permissions:
   - ✅ `pinFileToIPFS`
   - ✅ `pinJSONToIPFS`
6. Create and copy the keys
7. Add them to Render environment variables

**⚠️ Important**: Keep your API keys secure! Never commit them to Git.

## Monitoring and Maintenance

### Check Service Status

**Health Check Endpoint:**
```bash
curl https://your-backend.onrender.com/health
```

Expected response:
```json
{"status":"ok"}
```

### View Logs

1. Go to Render Dashboard
2. Select your `metabackend` service
3. Click "Logs" tab
4. View real-time logs

### Monitor Usage

**Render Free Tier Limitations:**
- Service may spin down after 15 minutes of inactivity
- First request after spin-down will be slower (cold start)
- 750 hours/month of runtime (enough for hobby projects)

**Pinata Free Tier:**
- 1 GB storage
- Gateway bandwidth limits apply

### Automatic Deployments

Render automatically redeploys when you push to your main branch:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render will automatically:
1. Pull the latest code
2. Run build command
3. Deploy the new version
4. Zero-downtime deployment

## Troubleshooting

### Build Fails

**Check build logs** in Render dashboard:
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles: `npm run build` locally
- Check for syntax errors

**Common issues:**
- Missing dependencies: Run `npm install` locally first
- TypeScript errors: Fix them locally before pushing
- Wrong Node version: Render uses Node 18 by default

### Service Not Starting

**Check start logs**:
- Verify `start` script in `package.json`
- Ensure `dist/server.js` exists after build
- Check for runtime errors in logs

### Upload Errors

**Pinata upload fails:**
- ✅ Verify API keys are correct
- ✅ Check Pinata dashboard for quota limits
- ✅ Ensure API keys have correct permissions
- ✅ Check if Pinata service is operational

**CORS errors:**
- ✅ Update CORS configuration in `src/server.ts`
- ✅ Add your frontend domain to allowed origins

### Cold Start Issues (Free Tier)

Render free tier spins down after inactivity:
- First request may take 30-60 seconds
- Subsequent requests are fast
- Consider upgrading to paid plan for always-on service

**Solutions:**
- Use paid plan ($7/month) for always-on service
- Implement a keep-alive ping from frontend
- Accept the cold start delay for hobby projects

## Production Best Practices

### Security

1. **Environment Variables**
   - Never commit `.env` files
   - Use Render's secret management
   - Rotate API keys regularly

2. **CORS Configuration**
   
   Update `src/server.ts` to allow only your frontend:
   ```typescript
   app.use(cors({
     origin: 'https://your-frontend.vercel.app',
     methods: ['GET', 'POST'],
     credentials: true
   }));
   ```

3. **Rate Limiting**
   
   Consider adding rate limiting for production:
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

### Monitoring

1. **Health Checks**
   - Use Render's built-in health checks
   - Monitor `/health` endpoint
   - Set up alerts for downtime

2. **Logging**
   - Use structured logging
   - Monitor Render logs regularly
   - Set up error alerts

3. **Usage Tracking**
   - Monitor Pinata usage
   - Track API request counts
   - Watch for unusual activity

### Scaling

**When to upgrade:**
- Cold starts affecting user experience
- Hitting free tier limits
- Need guaranteed uptime
- High traffic volume

**Render Paid Plans:**
- **Starter** ($7/month): Always-on, faster builds
- **Standard** ($25/month): More resources, autoscaling
- **Pro** ($85/month): High performance, priority support

## Alternative Deployment Options

### Railway

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Heroku

1. Create new app
2. Connect to GitHub
3. Set config vars (environment variables)
4. Enable automatic deploys

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

Deploy to any container platform (AWS ECS, Google Cloud Run, etc.)

## Support and Resources

- **Render Documentation**: https://render.com/docs
- **Pinata Documentation**: https://docs.pinata.cloud
- **Express Documentation**: https://expressjs.com

## Summary

**Quick Deployment Checklist:**

- [ ] Push code to GitHub
- [ ] Create Render web service
- [ ] Configure environment variables (Pinata keys)
- [ ] Deploy and wait for build
- [ ] Copy backend URL
- [ ] Update frontend environment variable
- [ ] Test health endpoint
- [ ] Test image upload functionality
- [ ] Monitor logs for errors

**Your backend is now live! 🚀**

Next step: Update your frontend's `NEXT_PUBLIC_BACKEND_URL` to point to this backend.

---

For frontend configuration, see:
- [Frontend Repository](https://github.com/ALEX-SHR-SUDO/metafrontend)
- Frontend: `BACKEND_CONFIGURATION.md`
