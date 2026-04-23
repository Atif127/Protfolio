# Portfolio — MERN Stack

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node-20+-339933?logo=nodedotjs)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?logo=mongodb)](https://mongodb.com)

A modern, full-stack portfolio application built with the MERN stack. Features dark/light mode, JWT authentication, an admin dashboard, Framer Motion animations, and a fully responsive design.

![Portfolio Preview](https://via.placeholder.com/800x400/0f0f23/ffffff?text=Portfolio+Preview)

---

## Features

### Frontend

- **React 18** with Vite for lightning-fast builds
- **Tailwind CSS** with custom CSS variables for seamless dark/light themes
- **Framer Motion** animations (scroll reveals, hover effects, page transitions)
- **React Router** with lazy-loaded pages for optimal performance
- **SEO** with react-helmet-async meta tags
- **Axios** with request interceptors for JWT handling
- Fully responsive mobile-first design

### Backend

- **Express.js** with ES Modules (`"type": "module"`)
- **MongoDB + Mongoose** with schema validation
- **JWT Authentication** with bcrypt password hashing
- **Express Validator** for request validation
- **Global Error Handler** with operational vs programming error separation
- **Async Handler** wrapper to eliminate try-catch boilerplate
- RESTful API design with standardized response format

### Admin Panel

- Secure login with JWT tokens
- Add / delete portfolio projects
- Protected routes with role-based access
- Statistics dashboard

---

## Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion, React Router |
| Backend    | Node.js, Express.js, Mongoose                             |
| Database   | MongoDB (Atlas or local)                                  |
| Auth       | JWT, bcryptjs                                             |
| Validation | express-validator                                         |
| Dev Tools  | ESLint, Nodemon, Concurrently                             |

---

## Project Structure

```
portfolio-mern/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── AnimatedSection.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SEO.jsx
│   │   │   └── AdminSidebar.jsx
│   │   ├── context/           # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/             # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AddProject.jsx
│   │   ├── services/          # API clients
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Express backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── errorHandler.js    # Global error handler
│   │   └── validate.js        # Input validation
│   ├── models/
│   │   ├── Project.js
│   │   ├── Contact.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── contacts.js
│   ├── utils/
│   │   ├── ApiError.js        # Custom error class
│   │   └── asyncHandler.js    # Async wrapper
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── package.json               # Root with concurrent scripts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone & Install

```bash
git clone https://github.com/username/portfolio-mern.git
cd portfolio-mern

# Install root dependencies
npm install

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 2. Environment Setup

```bash
# Backend
cd ../server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Frontend (optional - for production builds)
cd ../client
cp .env.example .env
```

**Server `.env`:**

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your_super_secret_key_min_32_chars
```

### 3. Seed Admin User (Optional)

```bash
cd server
node seed-admin.js   # Creates admin@example.com / admin123
```

### 4. Run Development

```bash
# From root directory
npm run dev
```

This starts:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## API Documentation

### Authentication

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register new user            |
| POST   | `/api/auth/login`    | Login & get JWT              |
| GET    | `/api/auth/me`       | Get current user (protected) |

### Projects

| Method | Endpoint            | Auth | Description        |
| ------ | ------------------- | ---- | ------------------ |
| GET    | `/api/projects`     | No   | Get all projects   |
| GET    | `/api/projects/:id` | No   | Get single project |
| POST   | `/api/projects`     | Yes  | Create project     |
| DELETE | `/api/projects/:id` | Yes  | Delete project     |

### Contact

| Method | Endpoint        | Auth | Description         |
| ------ | --------------- | ---- | ------------------- |
| POST   | `/api/contacts` | No   | Submit contact form |

### Health

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/api/health` | Server health check |

---

## Deployment

### Backend (Render / Railway / VPS)

1. Set environment variables on your platform:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CORS_ORIGIN=https://your-frontend.vercel.app`

2. Update `server.js` CORS for production:

```js
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  }),
);
```

3. Build & start:

```bash
cd server
npm start
```

### Frontend (Vercel / Netlify)

1. Update `client/vite.config.js` proxy or use environment variable:

```js
// .env.production
VITE_API_URL=https://your-api.render.com/api
```

2. Update `client/src/services/api.js`:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});
```

3. Build:

```bash
cd client
npm run build
```

4. Deploy the `dist/` folder to Vercel/Netlify.

---

## Scripts

| Script           | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Start both frontend and backend concurrently |
| `npm run server` | Start backend with nodemon                   |
| `npm run client` | Start frontend dev server                    |
| `npm start`      | Start backend in production                  |

---

## Design Decisions

### Why Vite over CRA?

- 10x faster startup and HMR
- Native ESM support
- Smaller bundle sizes with Rollup
- First-class TypeScript support

### Why CSS Variables over Tailwind's `dark:` everywhere?

- Centralized theme control in one place
- Easier to add new themes later
- Components remain agnostic to theme implementation
- Smaller className strings

### Why ApiError + asyncHandler?

- Eliminates repetitive try-catch blocks
- Distinguishes operational errors (bad input) from programming errors (bugs)
- Global error handler provides consistent error responses
- Cleaner, more readable controller code

---

## License

MIT License — feel free to use this as a starter for your own portfolio.

---

Built with attention to detail, performance, and developer experience.
