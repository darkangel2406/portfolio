# FolioVerse — No-Code Portfolio Creator & Interactive 3D Book Builder

> **A modern, budget-friendly full-stack platform to create, customize, preview, save, and publish professional portfolio websites without writing code.**

FolioVerse features a **signature interactive 3D digital book portfolio engine** alongside a library of **55 curated templates** across 11 professional categories.

---

## 🌟 Key Features

1. **Signature Interactive 3D Book Portfolio**:
   - Opens like a hardcover book with 3D perspective transforms (`rotateY`).
   - Dual-page spread on desktop, single-page reading mode on mobile.
   - Synthesized paper-rustle audio effect on page flips via the **Web Audio API** (100% offline, zero audio asset downloads needed).
   - Table of contents with instant chapter jumps.
   - Customizable covers: Antique Leather with Gold Foil, Midnight Sapphire, Executive Obsidian, and Royal Emerald.
   - Keyboard arrow navigation (`←` and `→`) and reduced-motion accessibility support.

2. **Complete 55-Template Library**:
   - **45 Free Templates**: Available to all users immediately upon registration.
   - **10 Premium Templates**: Unlocked with a **single one-time payment of ₹200 for the entire 10-template pack** (not per template).
   - Unified portfolio content schema: **switch between any of the 55 templates anytime with zero data loss**.

3. **Core Priority Templates Implemented**:
   - **OpenBook Portfolio**: Realistic 3D digital book with hardbound cover, dual-page spread, and audio.
   - **Neon Dev**: Dark cyberpunk developer portfolio with terminal snippet bar, glowing borders, and GitHub project cards.
   - **Minimal Engineer**: Swiss high-contrast typography, experience timeline, and resume download.
   - **Campus Launch**: Fresher & student portfolio with CGPA highlight badge, verified coursework, and capstone projects.
   - **Flipfolio**: Responsive digital book engine with responsive mobile reading mode.
   - Plus tailored layouts for UI/UX designers, creators, photographers, executives, and cybersecurity professionals.

4. **Split-Screen Live Editor**:
   - Tabbed editing: Profile, Theme, Skills, Projects, Experience, Education, Social Links, and SEO.
   - Real-time instant preview synchronization.
   - Multi-device viewport toggles: Desktop (1200px), Tablet (768px), and Mobile (390px).
   - Local image upload with 5MB validation + direct URL fallback.
   - Instant Draft Saving and 1-Click Publishing.

5. **Standalone Public Portfolios (`/p/:slug`)**:
   - Published portfolios receive a permanent public URL (e.g. `/p/alex-river`).
   - Accessible to recruiters and visitors **without needing an account or login**.
   - Strict privacy enforcement: unpublished drafts return `403 Forbidden` to public visitors.
   - Automatic slug collision deduplication (e.g. `alex-river-1`).
   - Live view counter tracking.

6. **Student & Budget Friendly Architecture**:
   - **No Firebase required**.
   - **Zero paid AI API dependencies** (no Gemini/OpenAI subscription fees).
   - **Zero cost local development** with self-contained atomic persistence (`server/data/database.json`).
   - Complete data portability: export all your portfolio drafts in one click as `.json`.

7. **Secure ₹200 Premium Pack & Payment Engine**:
   - Backend-created orders with server-side signature verification.
   - Razorpay integration ready for live Indian UPI/card payments.
   - Built-in **Developer Sandbox Mode** for local testing with zero fees when keys are not configured.
   - Idempotent entitlement granting (entitlement persists across logins and logouts).

---

## 🏗️ Architecture & Technology Stack

```
portfolio creator/
├── client/                     # Frontend (React 18/19, Vite, React Router, Lucide Icons)
│   ├── src/
│   │   ├── components/
│   │   │   ├── book/          # Interactive 3D Book Engine (BookEngine.jsx)
│   │   │   ├── layout/        # Navbar & Footer
│   │   │   ├── modals/        # PaymentModal (₹200 pack checkout)
│   │   │   └── templates/     # Dynamic Template Renderer
│   │   ├── context/           # AuthContext (JWT session state)
│   │   ├── data/              # 55-Template Central Registry (templatesData.js)
│   │   ├── pages/             # Landing, Gallery, Preview, Editor, Dashboard, Public, Auth, Settings
│   │   ├── services/          # REST API Client (api.js)
│   │   └── index.css          # Master Design System (Tokens, Glassmorphism, 3D Book CSS)
├── server/                     # Backend API (Node.js, Express)
│   ├── db/                    # Persistent Database & Storage Layer (storage.js)
│   ├── middleware/            # Auth & JWT verification (auth.js)
│   ├── routes/                # Auth, Portfolios, Public, Premium, Upload
│   ├── server.js              # Express Server Entrypoint
│   └── .env.example           # Environment template
├── scripts/
│   ├── dev.js                 # Unified dev runner (concurrent client + server)
│   └── test-api.js            # Automated End-to-End Test Suite (15 passing tests)
└── package.json               # Root scripts
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js v18+ (tested on Node v22)
- npm v9+

### 1. Install Dependencies
From the root workspace directory, run:
```bash
npm run install:all
```
*(This installs packages for both `client` and `server` automatically).*

### 2. Configure Environment Variables
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Default `.env` contents:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=folioview-super-secret-student-key-2025

# Optional: Razorpay Keys for live UPI/card payments.
# If left blank, the application automatically uses Developer Sandbox Mode!
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### 3. Start Development Servers
Run the unified dev runner from the workspace root:
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173` (proxied to port 5000)

Alternatively, to serve the production build:
```bash
npm run build:client
npm start
```
*(Serves both the backend API and client on `http://localhost:5000`).*

---

## 🧪 Running Automated Tests

A comprehensive 15-point test suite is included in `scripts/test-api.js`:
```bash
node scripts/test-api.js
```
Tested flows:
- `Health Check`: Endpoint health verification
- `Auth`: User registration with bcrypt hashing, user login with JWT
- `Session`: Session persistence and initial free entitlement verification
- `Portfolios`: UUID generation, unique slug assignment, draft preservation
- `Privacy`: Draft portfolios return `403 Forbidden` to unauthenticated visitors
- `Publishing`: 1-click publishing with ISO timestamps
- `Public URL`: Public access at `/p/:slug` without credentials and view counter tracking
- `Duplication`: Cloning portfolios with `-copy` slugs
- `Premium Engine`: ₹200 pack order creation and idempotent verification
- `Data Portability`: Full JSON archive export

---

## 💳 Payment Gateway Integration (Razorpay)

The ₹200 one-time premium pack unlocks all 10 premium templates forever.
- When `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are provided in `server/.env`, real Razorpay orders and HMAC SHA256 signatures are validated.
- When keys are omitted, the application runs in **Developer Sandbox Mode**, allowing students and reviewers to test the complete purchase journey, entitlement grant, and confetti celebration with zero financial charges.

---

## 📄 License & Student Notice
Crafted as an open-source, maintainable educational codebase. Free from vendor lock-in.
