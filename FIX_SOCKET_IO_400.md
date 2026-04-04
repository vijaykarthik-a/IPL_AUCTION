# Socket.IO 400 Error Fix - Action Items

## 🚨 Problem Identified

Your Vercel logs show:
```
GET 400 ipl-auction-... /socket.io/
```

This means Socket.IO requests are going to **Vercel** instead of **Render backend**.

**Root Cause**: `VITE_BACKEND_URL` environment variable is not set on Vercel.

---

## ✅ Fix Steps (Complete All)

### Step 1: Verify Render Backend is Running

1. Go to [render.com](https://render.com) dashboard
2. Click on your Web Service
3. Check status is **"Live"** ✅
4. Get the URL from the top (e.g., `https://ipl-auction-backend.onrender.com`)
5. Visit `https://ipl-auction-backend.onrender.com/health`
   - Should show: `{"status":"Server is healthy and running."}`

**If you see error or 502**: Backend has issues
- Check Render logs for errors
- Restart the service
- Check environment variables in Render

---

### Step 2: Set Environment Variable on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click on your project
3. Go to **Settings** tab
4. Click **Environment Variables**
5. Add new variable:
   ```
   Name: VITE_BACKEND_URL
   Value: https://ipl-auction-backend.onrender.com
   ```
   *(Replace with YOUR actual Render URL)*
6. Make sure it's set for all environments (Production, Preview, Development)
7. Click "Save"

---

### Step 3: Redeploy on Vercel

⚠️ **IMPORTANT**: Setting env vars doesn't auto-redeploy!

1. Go to **Deployments** tab on Vercel
2. Find the latest deployment
3. Click the **three dots (...)** menu
4. Click **"Redeploy"**
5. Wait for build to complete (~2-5 minutes)

---

### Step 4: Test Connection

After redeploy:

1. Open your Vercel app URL in browser
2. Open DevTools (F12)
3. Go to **Console** tab
4. Look for messages:
   ```
   ✅ [Socket.IO] Production mode - using: https://ipl-auction-backend.onrender.com
   ✅ [Socket.IO] ✅ Connected [socket-id]
   ```

**If you see error**:
   ```
   ❌ [Socket.IO] CRITICAL: VITE_BACKEND_URL not set in production!
   ```
   → Go back to Step 2, env var wasn't saved properly

---

### Step 5: Monitor Vercel Logs

1. Go to Vercel Dashboard
2. Click **Deployments**
3. Click latest deployment
4. Go to **Logs** tab
5. Should see:
   ```
   200 /socket.io/   (✅ Not 400)
   ```

---

## 🔍 Verification Checklist

- [ ] Render backend is "Live" and `/health` endpoint returns 200
- [ ] Render environment variables are set:
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL=https://your-vercel-url.vercel.app`
- [ ] Vercel environment variable is set:
  - [ ] `VITE_BACKEND_URL=https://your-render-url.onrender.com`
- [ ] Vercel is **redeployed** (not just saved env vars)
- [ ] Browser console shows connection messages (not 400 errors)

---

## 🐛 Debugging Commands

Open browser console on your Vercel app and type:

```javascript
// Check env var
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);

// Check if it's empty
if (!import.meta.env.VITE_BACKEND_URL) {
  console.error('VITE_BACKEND_URL is NOT SET!');
}

// Check socket status
import { socket } from './socket.js';
console.log('Socket connected:', socket.connected);
console.log('Socket ID:', socket.id);
```

---

## ⚡ Quick Reference URLs

After deployment, remember these URLs:

| Service | URL Format |
|---------|-----------|
| **Render Backend** | `https://your-app-name.onrender.com` |
| **Vercel Frontend** | `https://your-app-name.vercel.app` |

---

## 📞 Still Getting 400 Errors?

Try these:

1. **Clear browser cache**
   - Ctrl+Shift+Delete → Clear all

2. **Hard refresh**
   - Ctrl+Shift+R (or Cmd+Shift+R on Mac)

3. **Check browser console for exact error**
   - DevTools → Console tab
   - Look for detailed error message

4. **Check Render backend is reachable**
   - Visit `https://your-render-url/health` in browser
   - Should return JSON response

5. **Check CORS on backend**
   - Make sure `FRONTEND_URL` on Render matches Vercel URL exactly
   - Both should use `https://` (not `http://`)

---

## 🚀 Success Indicator

You'll know it's working when:
- ✅ No 400 errors in Vercel logs
- ✅ Browser console shows `[Socket.IO] ✅ Connected`
- ✅ Create Room works
- ✅ Bidding updates in real-time

