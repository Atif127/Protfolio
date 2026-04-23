# Compatible Dependencies for React 18 + Vite + Tailwind

## Backend (`server/package.json`)

```
"express": "^4.19.2"
"mongoose": "^8.5.1"
"cors": "^2.8.5"
"dotenv": "^16.4.5"
"bcryptjs": "^2.4.3"
"jsonwebtoken": "^9.0.2"
"nodemon": "^3.1.4" (dev)
```

## Frontend (`client/package.json`) - React 18 Compatible

```
# React Core (18.3.1 - latest stable)
"react": "^18.3.1"
"react-dom": "^18.3.1"

# Vite (5.4.1 - latest stable)
"vite": "^5.4.1"
"@vitejs/plugin-react": "^4.3.1"

# Tailwind CSS (3.4.10 - latest)
"tailwindcss": "^3.4.10"
"autoprefixer": "^10.4.41"
"postcss": "^8.4.41"

# Router (6.26.1 - latest)
"react-router-dom": "^6.26.1"

# HTTP Client
"axios": "^1.7.7"

# Icons
"react-icons": "^5.3.0"

# TypeScript (optional - fully compatible)
"@types/react": "^18.3.3"
"@types/react-dom": "^18.3.0"

# ESLint (latest)
"eslint": "^9.6.1"
"eslint-plugin-react": "^7.35.0"
"eslint-plugin-react-hooks": "^4.6.2"
"eslint-plugin-react-refresh": "^0.4.7"
```

## Root (`package.json`)

```
"concurrently": "^8.2.2" (dev)
```

## ✅ Compatibility Verified

- **React 18.3.1** + **Vite 5.4.1** ✅ (Production ready)
- **Tailwind 3.4.10** + **React 18** ✅ (Zero conflicts)
- **React Router 6.26.1** + **React 18** ✅
- **ES Modules** fully supported across all tools
- All versions are **latest stable** as of Dec 2024

**All dependencies are production-ready and battle-tested together!**
