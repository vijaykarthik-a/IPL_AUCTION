# Deployment Guide: Vercel + Render + Socket.IO

## Overview
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express + Socket.IO)

## Backend Deployment on Render

### Step 1: Create a Web Service on Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `server` directory as the root directory (or set build command correctly)

### Step 2: Configure Environment Variables on Render
In your Render dashboard, add these environment variables:

```
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Replace `your-vercel-app.vercel.app` with your actual Vercel app URL.

### Step 3: Configure Build and Start Commands
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 4: Get Your Render Backend URL
After deployment, you'll get a URL like: `https://ipl-auction-backend.onrender.com`

---

## Frontend Deployment on Vercel

### Step 1: Create a Project on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `client` folder as the root directory

### Step 2: Configure Environment Variables on Vercel
In your Vercel project settings, add:

```
VITE_BACKEND_URL=https://ipl-auction-backend.onrender.com
```

Replace with your actual Render backend URL.

### Step 3: Deploy
Click "Deploy" - Vercel will automatically build and deploy your app.

---

## Socket.IO Configuration Explained

### Backend Changes (server/src/index.js)
```javascript
const io = new Server(server, {
  cors: {
    origin: NODE_ENV === 'production' 
      ? FRONTEND_URL.split(',').map(url => url.trim()) 
      : "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowEIO3: true
  },
  transports: ['websocket', 'polling'] // Important for serverless
});
```

**Why these changes?**
- `origin`: Restricts WebSocket connections to your Vercel frontend only
- `transports`: Uses both WebSocket and polling (fallback for environments with WebSocket issues)
- `credentials: true`: Allows credentials to be sent with the connection

### Frontend Changes (client/src/socket.js)
```javascript
export const socket = io(getSocketURL(), {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling']
});
```

**Why these changes?**
- `reconnection`: Automatically reconnects if connection drops
- `transports`: Fallback to polling if WebSocket fails
- Production URL uses `VITE_BACKEND_URL` environment variable

---

## Local Development

### Step 1: Set up Backend
```bash
cd server
npm install
# Create .env file
echo "NODE_ENV=development" > .env
echo "FRONTEND_URL=http://localhost:5173" >> .env
npm start
```

### Step 2: Set up Frontend
```bash
cd client
npm install
# Create .env.local file
echo "VITE_BACKEND_URL=http://localhost:3001" > .env.local
npm run dev
```

---

## Troubleshooting

### Issue: "CORS error" or WebSocket connection fails
**Solution**: Make sure:
1. `VITE_BACKEND_URL` matches your Render backend URL on Vercel
2. `FRONTEND_URL` matches your Vercel frontend URL on Render
3. Both URLs include `https://` in production

### Issue: Connection timeout
**Solution**: Render's free tier might have cold starts. Make sure:
1. Backend is fully deployed and running
2. Check Render logs for errors
3. Increase `reconnectionAttempts` if needed

### Issue: WebSocket not working, but app loads
**Solution**: The fallback to polling will kick in automatically. This is normal behavior.

---

## Summary of Changes Required

| File | Change | Why |
|------|--------|-----|
| `server/src/index.js` | Add CORS, transports, env vars | Support cross-origin WebSocket |
| `client/src/socket.js` | Add env variable support | Point to Render backend |
| `.env` files | Create config templates | Store sensitive URLs |

---

## Testing Connection

To verify Socket.IO is working:
1. Open browser DevTools (F12) → Network tab
2. Look for WebSocket connections or XHR polling
3. You should see connection messages in the console

Check both localhost and production environments!
