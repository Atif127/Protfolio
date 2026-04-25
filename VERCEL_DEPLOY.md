# Vercel Deployment Guide

## Problem: 404 NOT_FOUND on React Router Routes

When deploying a Vite React app with React Router to Vercel, direct access to routes like `/projects` or `/contact` returns a 404. This happens because Vercel tries to find a file at that path instead of serving the SPA's `index.html`.

## Solution Overview

1. **`vercel.json`** in `client/` with SPA rewrite rules
2. **Vercel dashboard** configured with correct root directory
3. **Production API URL** configured in frontend

---

## Step 1: Verify `client/vercel.json`

The `vercel.json` file in `client/` handles SPA routing:

```json
{
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

This ensures **all routes** serve `index.html`, letting React Router handle client-side navigation.

---

## Step 2: Vercel Dashboard Settings

1. Go to [vercel.com](https://vercel.com) and import your GitHub repo
2. In project settings, set:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

   > Vite builds to `dist/` by default (NOT `build/` like CRA).

---

## Step 3: Configure Production API URL

Create `client/.env.production`:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

Then update `client/src/services/api.js`:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## Step 4: Deploy

### Option A: Vercel CLI

```bash
cd client
vercel --prod
```

### Option B: Git Push (Recommended)

```bash
git add .
git commit -m "ready for vercel deploy"
git push origin main
```

Vercel auto-deploys on push.

---

## Deployment Checklist

- [ ] `client/vercel.json` exists with SPA rewrite rules
- [ ] Vercel project Root Directory set to `client`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] `client/.env.production` has `VITE_API_URL` pointing to live backend
- [ ] Backend CORS allows Vercel domain:
  ```js
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    }),
  );
  ```
- [ ] Backend deployed and healthy (`GET /api/health` returns 200)
- [ ] `npm run build` runs locally without errors:
  ```bash
  cd client
  npm run build
  ```
- [ ] `dist/index.html` exists after build
- [ ] Test direct URL access: `https://your-app.vercel.app/projects`

---

## Common Issues & Fixes

| Issue              | Cause                         | Fix                                           |
| ------------------ | ----------------------------- | --------------------------------------------- |
| 404 on `/projects` | Missing `vercel.json` rewrite | Add `vercel.json` with `"source": "/(.*)"`    |
| 404 on all pages   | Wrong output directory        | Set Output Directory to `dist`, not `build`   |
| Blank page         | Wrong root directory          | Set Root Directory to `client`                |
| API calls fail     | CORS or wrong API URL         | Set `CORS_ORIGIN` on backend + `VITE_API_URL` |
| Styles broken      | Base path mismatch            | Ensure `base: '/'` in `vite.config.js`        |

---

## Verify Build Locally

```bash
cd client
npm run build
npx serve dist
# Open http://localhost:3000
# Test direct access to http://localhost:3000/projects
```

If it works locally with `serve`, it will work on Vercel.
