# ZIP URL — Frontend

The React frontend for **ZIP URL**, a self-hosted URL shortening service. Paste a long link, get a short one — that's it. Accounts are required to create links, but anyone can follow them.

---

## Features

- Shorten any URL with one click and copy the result to clipboard
- Register an account and confirm your e-mail before first login
- Cookie-based session authentication (no tokens stored in localStorage)
- Dashboard showing all your shortened links and active sessions
- 404 page for unknown routes

---

## Tech stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS |
| UI primitives | Radix UI |
| Icons | Lucide React |

---

## Prerequisites

- **Node.js** 18 or newer and **npm**
- The **ZIP URL backend** must be running — see the [backend README](../zip_url/README.md) for setup instructions

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd zip_url_front
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

The only variable you need to set is the backend URL:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Change this to your backend's public address when deploying to production.

### 4. Start the dev server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

> Make sure the backend is running at the URL you set in `.env` before you open the app.

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

---

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Base URL of the ZIP URL backend API |

---

## Backend

This frontend is the UI layer for the ZIP URL backend API. The backend handles authentication, link storage, and redirects. You can find the backend project and its setup guide in the `zip_url` directory (or repo).

---

## License

[MIT](LICENSE)
