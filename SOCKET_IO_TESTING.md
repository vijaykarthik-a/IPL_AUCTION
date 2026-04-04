# Socket.IO Testing & Debugging Guide

## ✅ Current Setup Status

Your Socket.IO configuration is properly set up for both development and production:

**Backend** (server/src/index.js):
- ✅ CORS configured for production
- ✅ WebSocket + Polling fallback enabled
- ✅ Environment variables loaded
- ✅ Socket handlers connected (auction.js)

**Frontend** (client/src/socket.js):
- ✅ Auto-detects environment (dev vs prod)
- ✅ Reconnection logic enabled
- ✅ Transports configured (WebSocket + polling)
- ✅ `autoConnect: false` (manual connection on demand)

---

## 🧪 Testing Socket.IO Connection

### Test 1: Local Development (Recommended First)

1. **Start Backend**:
   ```bash
   cd server
   npm start
   # Should output: "Real-Time IPL Auction Backend running on port 3001"
   ```

2. **Start Frontend** (new terminal):
   ```bash
   cd client
   npm run dev
   # Should output: "Local: http://localhost:5173"
   ```

3. **Open Browser Console** (F12 → Console tab):
   - Look for Socket.IO connection messages
   - Should see something like:
     ```
     Socket.IO connection initialized
     Connecting to: http://localhost:3001
     ```

4. **Navigate to a page that uses Socket.IO**:
   - Click "Live Auctions" or "Create Room"
   - This triggers socket connection

5. **Check Connection Status**:
   Open DevTools Console and type:
   ```javascript
   import { socket } from './socket.js';
   console.log('Socket connected:', socket.connected);
   console.log('Socket ID:', socket.id);
   ```

---

### Test 2: Check Network Tab

1. **Open DevTools** → **Network** tab
2. **Filter by "WS"** (WebSocket) or **"fetch"**
3. **Perform an action** (create room, place bid)
4. **Look for**:
   - ✅ WebSocket connection to `localhost:3001`
   - ✅ Messages like `socket.io/?EIO=4&transport=websocket`
   - ✅ Green status (connected)

---

### Test 3: Check If Socket Emits Work

Add this to any component that uses socket:

```javascript
import { socket } from '../socket';

useEffect(() => {
  if (!socket.connected) {
    socket.connect();
  }

  // Test connection
  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });

  return () => {
    socket.off('connect');
    socket.off('disconnect');
  };
}, []);
```

---

## 📊 Expected Behavior

### Connection Flow:

```
Browser
   ↓
socket.connect() called
   ↓
Client attempts WebSocket connection
   ↓
↙─────────────┐─────────────┘
✅ WebSocket  └➔  ❌ Falls back to polling (if WebSocket fails)
   ↓                  ↓
Connected         Connected via polling
   ↓                  ↓
socket.connected = true
socket.id = assigned
'connect' event fired
```

---

## 🐛 Troubleshooting

### Issue 1: "Cannot GET /"

**Cause**: Vercel frontend can't find backend
**Solution**: 
1. Make sure backend is deployed on Render
2. Verify `VITE_BACKEND_URL` env var on Vercel
3. Format: `https://your-render-url.onrender.com` (include https://)

---

### Issue 2: WebSocket Connection Refused

**Error in Console**: `WebSocket is closed before the connection is established`

**Cause**: Backend not running or CORS misconfigured

**Solution**:
```javascript
// Check backend URL
console.log('Connecting to:', import.meta.env.VITE_BACKEND_URL);

// Verify CORS on backend
// server/src/index.js should have:
// origin: NODE_ENV === 'production' 
//   ? FRONTEND_URL.split(',').map(url => url.trim()) 
//   : "*"
```

---

### Issue 3: Connection Timeout (Production)

**Error**: Takes too long to connect on Vercel/Render

**Cause**: Cold start on free tier or slow network

**Solution**:
1. Check Render logs for errors
2. Upgrade from free tier ($7/mo Starter)
3. Increase `reconnectionAttempts` in socket.js:
   ```javascript
   reconnectionAttempts: 10  // was 5
   ```

---

### Issue 4: "Mixed Content" Error

**Error**: `Mixed Content: The page was loaded over HTTPS, but requested an insecure WebSocket connection`

**Cause**: Frontend is HTTPS but backend is HTTP

**Solution**: Always use `https://` for production Render URLs
```
✅ Correct: https://your-render-url.onrender.com
❌ Wrong: http://your-render-url.onrender.com
```

---

### Issue 5: Socket Works Locally but Not in Production

**Diagnosis Steps**:

1. **Check Vercel Env Variables**:
   ```
   VITE_BACKEND_URL = https://your-render-url.onrender.com
   ```

2. **Verify in Vercel Logs**:
   - Go to Vercel Dashboard → Deployments
   - Check logs for env var presence

3. **Redeploy After Changing Env Vars**:
   - Setting env var doesn't auto-redeploy
   - Click "Redeploy" button manually

4. **Check Browser Console** (Production):
   - Open DevTools on production site
   - Look for connection URL
   - Should show Render URL, not localhost

---

## 🔍 Debug Commands

### In Browser Console (Production):

```javascript
// Check socket configuration
import { socket } from './socket.js';

// Log current URL
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);

// Check connection status
console.log('Connected:', socket.connected);
console.log('Socket ID:', socket.id);

// Test emit
socket.emit('test', { message: 'Hello' });

// Listen for all events
socket.onAny((event, ...args) => {
  console.log(`Event: ${event}`, args);
});
```

---

## ✅ Verification Checklist

- [ ] Backend (server/src/index.js) has environment variable support
- [ ] Frontend (client/src/socket.js) reads VITE_BACKEND_URL
- [ ] .env.example files exist in both client/ and server/
- [ ] Local development works (localhost:5173 ↔ localhost:3001)
- [ ] Render deployment has correct env vars
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL=https://your-vercel-url`
- [ ] Vercel deployment has correct env var
  - [ ] `VITE_BACKEND_URL=https://your-render-url.onrender.com`
- [ ] Both use HTTPS (not HTTP)
- [ ] Vercel redeployed after adding env vars

---

## 🚀 Live Testing Steps

### For Local:
1. `npm start` in server folder
2. `npm run dev` in client folder
3. Open http://localhost:5173
4. Check console for "Socket connected"

### For Production:
1. Deploy backend on Render
2. Copy Render URL
3. Deploy frontend on Vercel with `VITE_BACKEND_URL`
4. Open DevTools on Vercel app
5. Check console for "Socket connected"

---

## 📞 Common Questions

**Q: Why is socket.connected = false?**
A: Socket uses `autoConnect: false`. You need to call `socket.connect()` manually.

**Q: How do I know if polling is active?**
A: In DevTools Network tab, look for XHR requests to `/socket.io/` - these are polling.

**Q: Can both WebSocket and polling work?**
A: Yes! WebSocket is preferred, polling is fallback if WebSocket fails.

**Q: Do I need to manually connect socket?**
A: Check your components - most should call `socket.connect()` in useEffect.

---

## 🔗 Reference

- **Socket.IO Docs**: https://socket.io/docs/v4/client-api/
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
