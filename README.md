# GitFetcher Frontend

React + Vite frontend for the GitHub Fetcher MERN application.

## Setup

```bash
npm install
npm run dev
```

Runs at **http://localhost:5173**

## ⚠️ Backend CORS Requirement

The Express backend (`github_fetcher`) must have CORS enabled to accept requests from the frontend.

Add the following to your backend's `server.js`:

```js
import cors from "cors";

app.use(cors({ origin: "http://localhost:5173" }));
```

Then install the package in the backend:

```bash
npm install cors
```

## Project Structure

```
src/
├── api/
│   └── api.js              # Axios API utility (base URL + auth headers)
├── components/
│   ├── ProtectedRoute.jsx  # Redirects unauthenticated users to /login
│   └── RepoCard.jsx        # Displays fetched GitHub repo data
├── context/
│   └── AuthContext.jsx     # JWT auth state + localStorage persistence
├── pages/
│   ├── Login.jsx           # POST /api/auth/login
│   ├── Register.jsx        # POST /api/auth/register
│   └── Dashboard.jsx       # GET /api/repo?owner=&repo=
├── App.jsx                 # Router + AuthProvider
├── main.jsx                # React DOM entry point
└── index.css               # Global styles (GitHub dark theme)
```

## Routes

| Path        | Component   | Protected |
|-------------|-------------|-----------|
| `/login`    | Login       | No        |
| `/register` | Register    | No        |
| `/dashboard`| Dashboard   | ✅ Yes    |
| `*`         | → `/login`  | —         |
