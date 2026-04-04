# Render Deployment - Step by Step Guide

## Setting Up Environment Variables on Render

### For FREE Tier (Hobby Projects):
✅ Recommended for testing/development
- 512 MB RAM
- 0.1 CPU
- Good enough for real-time auction with limited concurrent users
- **Limitation**: Free tier services spin down after 15 min of inactivity

### For PRODUCTION Use:
🚀 Recommended: **Starter ($7/month)**
- 512 MB RAM (same as free)
- 0.5 CPU (much better)
- Always running
- Best value for small production apps

---

## Step-by-Step: Add Environment Variables on Render

### Method 1: Manual Addition (Recommended for Vercel + Render setup)

1. **In your Render dashboard**, go to your Web Service
2. Click on **"Environment"** in the left sidebar
3. Click **"Add Environment Variable"** button
4. Add these variables one by one:

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Sets app to production mode |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your Vercel frontend URL |
| `PORT` | Leave blank (Render auto-assigns) | Port assignment |

**Example:**
```
NODE_ENV = production
FRONTEND_URL = https://ipl-auction.vercel.app
```

### Method 2: Upload from .env File (Alternative)

1. Click **"Add from .env"** button on Render
2. Copy contents from `server/.env.example`:
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
3. Paste into the form and submit

---

## Important URLs to Remember

After deployment, you'll have:

1. **Render Backend URL** (from Render dashboard):
   - Example: `https://ipl-auction-backend.onrender.com`
   - This goes into your Vercel `VITE_BACKEND_URL`

2. **Vercel Frontend URL** (from Vercel dashboard):
   - Example: `https://ipl-auction.vercel.app`
   - This goes into your Render `FRONTEND_URL`

---

## Quick Checklist for Render Deployment

- [ ] Select your GitHub repository
- [ ] Set Root Directory to: `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Add Environment Variables:
  - `NODE_ENV=production`
  - `FRONTEND_URL=https://your-vercel-url`
- [ ] Click Deploy
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Copy the Render URL from dashboard

---

## Next: Configure Vercel with Render URL

Once Render deployment is complete:

1. Go to your **Vercel project settings**
2. Go to **Environment Variables**
3. Add:
   ```
   VITE_BACKEND_URL = https://your-render-url.onrender.com
   ```
4. Redeploy Vercel (or it redeploys automatically)

---

## Testing Connection

After both are deployed:
1. Open your Vercel app
2. Open Browser DevTools (F12)
3. Go to Console tab
4. You should see Socket.IO connection messages
5. Check Network tab for WebSocket or XHR connections

✅ If you see "Socket.IO connection successful" → Everything is working!
