# Fix "Cannot GET /" Error on Vercel

## 🔴 Problem

You're seeing "Cannot GET /" when accessing your Vercel app. This means Vercel isn't properly serving your React SPA (Single Page Application).

## ✅ Solution

The issue is fixed in the updated `client/vercel.json` file. Here's what to do:

### Step 1: Ensure vercel.json is Correct

Your `client/vercel.json` should have:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

This tells Vercel:
- ✅ Build command: `npm run build`
- ✅ Output folder: `dist` (Vite's default)
- ✅ Framework: Vite
- ✅ Rewrite all routes to `/index.html` (for React Router)
- ✅ Cache assets for performance

### Step 2: Verify vite.config.js

Your `client/vite.config.js` should include:

```javascript
build: {
  outDir: 'dist',
  sourcemap: false
}
```

### Step 3: Redeploy on Vercel

1. Go to Vercel Dashboard
2. Find your project
3. Click **Deployments** tab
4. Click the three dots (...) on latest deployment
5. Select **"Redeploy"**
6. Wait for build to complete

⚠️ **Important**: Just pushing to GitHub might not work if files were already committed. Use "Redeploy" button.

### Step 4: Verify It Works

After redeploy:
- Visit your Vercel URL
- Should see the landing page (not "Cannot GET /")
- Console should show Socket.IO messages
- Navigation should work

---

## 🔍 What Was the Problem?

| Issue | Cause |
|-------|-------|
| `Cannot GET /` | Vercel couldn't route React Router URLs to index.html |
| 404 on page navigation | Rewrite rules weren't configured |
| `dist` folder not found | Output directory not specified to Vercel |

The `vercel.json` file tells Vercel how to handle your SPA. Without it (or with incorrect config), Vercel tries to serve static files directly, which fails when you navigate using React Router.

---

## 🛠️ Manual Vercel Configuration (Alternative)

If `vercel.json` doesn't work, configure Vercel dashboard:

1. Go to project **Settings**
2. Under **Build & Development Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. Under **Environment Variables**:
   - Add: `VITE_BACKEND_URL = https://your-render-url.onrender.com`

---

## ✅ Success Indicators

- ✅ Landing page loads without "Cannot GET /"
- ✅ Can navigate between pages (Home, Live Auctions, Player Pool)
- ✅ URL changes when navigating
- ✅ Page reload works on any route
- ✅ Socket.IO connects successfully

---

## 🚨 Still Getting Error?

1. **Hard refresh browser**
   - Ctrl+Shift+R (or Cmd+Shift+R on Mac)
   - Or Ctrl+Shift+Delete to clear cache

2. **Check Vercel logs**
   - Deployments → Latest → Logs
   - Should show successful build

3. **Verify file exists**
   - Deployments → Latest → Files
   - Should have `dist/index.html`

4. **Check Root Directory**
   - Project Settings → Root Directory
   - Should be `client` (not empty)

---

## 📋 Files Updated

- ✅ `client/vercel.json` - Added complete Vercel config
- ✅ `client/vite.config.js` - Added build output config
- ✅ Build tested locally - Works successfully

Push these changes and redeploy!
