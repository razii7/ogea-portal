# OGEA Outreach Management Portal

> Official digital outreach, guidance, and event management platform for the **Office of Guidance & External Activities (OGEA)**, Secondary & Senior Secondary Institution, Darul Huda Islamic University (DHIU).

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1.14-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-navy.svg)](#)

---

## 📌 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Demo Credentials](#-demo-credentials)
- [Folder Structure](#-folder-structure)
- [Architecture & Routing](#-architecture--routing)
- [Deployment (Vercel)](#-deployment-vercel)
- [Available Scripts](#-available-scripts)

---

## 🏛️ Project Overview

The **OGEA Outreach Portal** is a web application designed to bridge the gap between institutional outreach programs and students. It allows students to explore and apply for external initiatives, track application statuses, read literary works, and view institutional achievements, while empowering coordinators with an end-to-end admin dashboard to publish programs, review candidates, and monitor statistics.

---

## ✨ Key Features

### 🌐 Public Portal
- **Hero & Institutional Milestones**: Showcase of community engagement and 150+ milestone events.
- **Programs Directory**: Filterable list of upcoming and active outreach programs with detailed eligibility and deadlines.
- **Literary Works & Articles**: Repository of articles, research papers, and student publications with reading view.
- **Hall of Achievements**: Showcase of awards, milestones, and student accomplishments.
- **Interactive Analytics**: Visual charts highlighting outreach distribution, participation rates, and category breakdowns.

### 🎓 Student Portal
- **Secure Registration & Sign-In**: Individual student profiles linked to academic batches.
- **One-Click Application**: Apply directly to outreach opportunities with dynamic status tracking (`Pending`, `Shortlisted`, `Selected`, `Rejected`).
- **Profile & Application Management**: View personal application history and edit profile details.

### 🛡️ Admin & Coordinator Dashboard
- **Program Lifecycle Management**: Create, edit, publish, and close outreach programs.
- **Application Review Pipeline**: Filter applications by program, search candidates, and update application statuses in real time.
- **Student Directory**: Access verified student records and batch demographics.
- **Analytical Overviews**: Real-time program metrics and application stats.

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) (ES Modules) |
| **Build Tool & Dev Server** | [Vite 7](https://vitejs.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) (Data APIs / `createBrowserRouter` + Lazy Loading) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Navy & Gold Design Tokens |
| **Animation & Motion** | [Framer Motion (motion/react)](https://motion.dev/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **UI Primitives** | Radix UI (`@radix-ui/react-select`, `@radix-ui/react-slot`) |
| **Deployment** | [Vercel](https://vercel.com/) (SPA with client-side rewrites) |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 2. Installation
Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/<your-username>/ogea-public.git
cd ogea-public

# Install dependencies
npm install
```

### 3. Running Locally
Start the development server:

```bash
npm run dev
```
Open `http://localhost:5173` (or the port shown in your terminal) in your browser.

### 4. Building for Production
Create an optimized production bundle:

```bash
npm run build
```
Preview the production build locally:

```bash
npm run preview
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Base API URL for backend services (optional for mock mode)
VITE_API_BASE_URL=https://api.chsoutreach.live/api/v1
```

> **Note:** When no backend is connected, the portal automatically operates in offline/demo mode using browser `localStorage` for authentication and data persistence.

---

## 🔑 Demo Credentials

For quick evaluation and testing, the portal includes pre-seeded demo accounts with **one-click Autofill** on the Login page:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@ogea.edu` | `Admin@123` | Full dashboard, create programs, review applications |
| **Student** | `student@ogea.edu` | `Student@123` | Apply to programs, view application history |

---

## 📁 Folder Structure

```
ogea-public/
├── public/                  # Static public assets (favicon, logos)
├── src/
│   ├── assets/              # Banners, images, and brand assets
│   │   └── banners/         # Hero and event banners
│   ├── components/
│   │   ├── custom/          # Domain-specific components
│   │   │   ├── about/       # About section components
│   │   │   ├── articlecard/ # Publication and work cards
│   │   │   ├── error/       # 404 & error boundary components
│   │   │   ├── footer/      # Navigation footer
│   │   │   ├── header/      # Sticky responsive navigation bar
│   │   │   ├── hero/        # Hero banner section
│   │   │   ├── programs/    # Program listings & upcoming carousel
│   │   │   ├── routeguard/  # ProtectedRoute auth wrapper
│   │   │   └── stats/       # Metric counters & highlights
│   │   ├── shared/          # Reusable shared UI widgets (loaders, dialogs)
│   │   └── ui/              # Base UI components (Radix primitives, badges)
│   ├── context/
│   │   └── AuthContext.jsx  # React Context for global auth state
│   ├── hooks/               # Custom React hooks
│   ├── layout/
│   │   └── Layout.jsx       # Main layout wrapper (Header + Outlet + Footer)
│   ├── lib/
│   │   ├── auth.js          # Client-side session and user store
│   │   ├── mockData.js      # Mock datasets (batches, articles, achievements)
│   │   ├── programsStore.js # Program state management and local storage syncing
│   │   └── utils.js         # Class merging and string helpers
│   ├── Pages/               # Route page components
│   │   ├── Achievements.jsx # Institutional achievements gallery
│   │   ├── AdminDashboard.jsx# Coordinator management console
│   │   ├── Article.jsx      # Single publication reading view
│   │   ├── Charts.jsx       # Analytics and reporting charts
│   │   ├── Contact.jsx      # Contact and inquiries page
│   │   ├── Home.jsx         # Main portal landing page
│   │   ├── Login.jsx        # Unified role-based login & registration
│   │   ├── StudentDashboard.jsx # Student application tracker
│   │   └── Works.jsx        # Publications & literary works directory
│   ├── routes/
│   │   └── routes.jsx       # React Router route tree definitions
│   ├── services/
│   │   └── api.js           # Axios HTTP client configuration
│   ├── App.jsx              # Main App entry with RouterProvider
│   ├── index.css            # Tailwind CSS and Navy-Gold design tokens
│   └── main.jsx             # React DOM root render
├── .env.example             # Template for environment variables
├── .gitignore               # Git ignored patterns
├── package.json             # NPM dependencies and scripts
├── vercel.json              # Vercel rewrite configuration for SPA
└── vite.config.js           # Vite build and path alias configuration
```

---

## 🔒 Architecture & Routing

- **Client-Side Routing**: Handled by `createBrowserRouter` with lazy loading (`React.lazy` + `Suspense`) for optimal bundle splitting.
- **Route Protection**: Protected routes (`/admin`, `/student`) are guarded by `<ProtectedRoute role="..." />` which redirects unauthenticated or unauthorized users to `/login`.
- **Hybrid Data Layer**: `programsStore.js` and `auth.js` automatically sync state to `localStorage`, allowing the portal to function seamlessly as a standalone static SPA or connect to an external REST API via `VITE_API_BASE_URL`.

---

## ☁️ Deployment (Vercel)

This project is pre-configured for seamless zero-config deployment on Vercel:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository.
   - Vercel automatically detects `Vite` preset.
   - Click **Deploy**.

> `vercel.json` ensures all deep routes (e.g. `/student`, `/admin`, `/works/1`) correctly rewrite to `/index.html` without 404 errors on browser refresh.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local development server with HMR |
| `npm run build` | Compiles production assets into `dist/` |
| `npm run preview` | Locally serves the production `dist/` build |
| `npm run lint` | Runs ESLint to identify code quality issues |

---

## 👥 Contributors & Credits
- **Office of Guidance and External Activities (OGEA)**
- **Darul Huda Islamic University (DHIU)**
