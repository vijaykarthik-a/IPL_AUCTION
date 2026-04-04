# Quick Reference: What to Enter Where

## 🎯 RENDER Backend Configuration

### Environment Variables to Add:
```
NODE_ENV                 = production
FRONTEND_URL             = https://ipl-auction.vercel.app
```
(Replace `ipl-auction.vercel.app` with YOUR Vercel URL)

### Build Settings:
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free (for testing) or Starter $7/mo (for production)

---

## 🎯 VERCEL Frontend Configuration

### Environment Variables to Add:
```
VITE_BACKEND_URL         = https://your-render-url.onrender.com
```
(This URL will be provided by Render after deployment)

### Root Directory:
- `client`

---

## 📋 Step-by-Step Deployment Flow

### Phase 1: Deploy Backend on Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. **Set Root Directory**: `server`
5. **Add Environment Variables**:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://ipl-auction.vercel.app` ← UPDATE THIS
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`
8. Click "Create Web Service"
9. **Wait for deployment** (5-10 minutes)
10. **Copy the URL** from the top of the Render dashboard
    - Example: `https://ipl-auction-backend.onrender.com`

### Phase 2: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import GitHub repository
4. **Set Root Directory**: `client`
5. Add **Environment Variable**:
   - `VITE_BACKEND_URL=https://your-render-url.onrender.com` ← USE URL FROM STEP 10 ABOVE
6. Click "Deploy"
7. **Wait for deployment** (2-5 minutes)
8. **Copy the Vercel URL**
    - Example: `https://ipl-auction.vercel.app`

### Phase 3: Update Render with Vercel URL (if needed)

1. Go back to Render dashboard
2. Click your Web Service
3. Go to "Environment"
4. Update `FRONTEND_URL` to match your Vercel URL from Phase 2
5. Redeploy

---

## ✅ Instance Type Recommendation

| Use Case | Recommended | Price | Why |
|----------|------------|-------|-----|
| **Testing** | Free Tier | $0 | Good for development, has sleep periods |
| **Small Auctions** | Free Tier | $0 | Perfect for <50 concurrent users |
| **Production** | Starter | $7/mo | Always running, better CPU |
| **Large Auctions** | Standard | $25/mo | For >100 concurrent users |

**For IPL Auction App**: Start with **Free Tier** for testing, then upgrade to **Starter** ($7/mo) for production.

---

## 🔗 Architecture After Deployment

```
┌─────────────────┐
│   Your Browser  │
└────────┬────────┘
         │ WebSocket via Socket.IO
         │
    ┌────▼──────────────────┐
    │  VERCEL (Frontend)    │
    │  ipl-auction.        │
    │  vercel.app          │
    └────┬──────────────────┘
         │ 
         │ VITE_BACKEND_URL =
         │ render-url.onrender.com
         │
    ┌────▼──────────────────┐
    │ RENDER (Backend)      │
    │ ipl-auction-         │
    │ backend.onrender.com │
    │                      │
    │ Node.js + Express +  │
    │ Socket.IO            │
    └──────────────────────┘
```

---

## 🚨 Common Issues & Fixes

### Issue: CORS Error
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Fix**: Make sure in Render environment variables:
```
FRONTEND_URL=https://ipl-auction.vercel.app
```
(Exact URL of your Vercel app)

### Issue: WebSocket Connection Timeout
**Error**: `WebSocket connection timeout`

**Fix**: 
1. Check Render logs for errors
2. If on Free Tier, might be starting up (cold start)
3. Upgrade to Starter tier ($7/mo) to avoid cold starts

### Issue: Connection works locally but not in production
**Error**: `Cannot connect to backend`

**Fix**:
1. Verify `VITE_BACKEND_URL` on Vercel matches actual Render URL
2. Check both URLs are using `https://` (not `http://`)
3. Redeploy Vercel after changing env variables

---

## 📞 Support

- **Render Support**: https://render.com/docs
- **Vercel Support**: https://vercel.com/docs
- **Socket.IO Docs**: https://socket.io/docs
