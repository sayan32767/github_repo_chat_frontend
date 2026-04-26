# Github Repo Chat

A React frontend for a GitHub repository AI assistant. Users authenticate, search for any public GitHub repository, process its source code, and then ask natural language questions about it. The assistant answers using repository-aware context and links responses back to the relevant source files.

---

## Description

Github Repo Chat connects to an Express/MongoDB backend that indexes GitHub repositories using embeddings and answers developer questions using a local or hosted LLM. The frontend handles authentication, repository lookup, processing state, and a persistent chat interface with Markdown rendering.

---

## Features

- JWT-based authentication (login and register)
- GitHub repository search by owner and repository name
- Repository details view (stars, forks, issues, language breakdown, recent commits, README)
- One-click repository processing with real-time status feedback
- Chat interface for asking questions about processed repositories
- Markdown and GFM rendering in AI responses (code blocks, tables, lists)
- Source file links in AI responses pointing to the relevant GitHub file
- Persistent chat history loaded per user and repository
- Sidebar showing recently accessed repositories
- Loading and processing state indicators throughout

---

## Tech Stack

| Layer              | Technology                      |
| ------------------ | ------------------------------- |
| UI framework       | React 18 (Vite)                 |
| Routing            | React Router v6                 |
| HTTP client        | Axios                           |
| Auth state         | Context API + localStorage      |
| Markdown rendering | react-markdown + remark-gfm     |
| Styling            | Vanilla CSS (custom dark theme) |

---

## Folder Structure

```
src/
├── api/
│   └── api.js              # Axios functions for all backend endpoints
├── components/
│   ├── ChatBox.jsx          # Scrollable chat input and message list
│   ├── ChatMessage.jsx      # Individual message bubble with Markdown and sources
│   ├── ProcessButton.jsx    # Triggers repository processing
│   ├── ProtectedRoute.jsx   # Redirects unauthenticated users
│   ├── RepoDetails.jsx      # Displays repo metadata, languages, commits, README
│   ├── RepoInput.jsx        # Owner + repo name form
│   └── SideBar.jsx          # Recent repository history list
├── context/
│   └── AuthContext.jsx      # Auth state provider (token, login, logout)
├── pages/
│   ├── Dashboard.jsx        # Main page with sidebar and repo input
│   ├── Login.jsx            # Login form
│   ├── Register.jsx         # Registration form
│   └── RepoPage.jsx         # Repository detail, processing, and chat page
├── App.jsx                  # Router setup and route definitions
├── main.jsx                 # React DOM entry point
└── index.css                # Global styles and design tokens
```

---

## Environment Variables

This frontend does not use a `.env` file directly. The backend base URL is defined in `src/api/api.js`:

```js
const BASE_URL = "http://localhost:5000/api";
```

Update this value if the backend is deployed to a different host or port.

---

## Installation and Setup

**Prerequisites:** Node.js 18+ and npm.

Clone the repository and install dependencies:

```bash
git clone https://github.com/sayan32767/github_repo_chat_frontend.git
cd github_repo_chat_frontend
npm install
```

---

## Running the App

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

The backend must be running at `http://localhost:5000` before using the app. See the backend repository for setup instructions.

---

## API Integration

The frontend communicates with the following backend endpoints:

| Method | Endpoint                        | Description                                        |
| ------ | ------------------------------- | -------------------------------------------------- |
| `POST` | `/api/auth/register`            | Register a new user                                |
| `POST` | `/api/auth/login`               | Log in and receive a JWT                           |
| `GET`  | `/api/repo?owner=&repo=`        | Fetch repository details and README                |
| `GET`  | `/api/repo/status?owner=&repo=` | Check if a repository has been processed           |
| `POST` | `/api/repo/process`             | Trigger repository processing                      |
| `POST` | `/api/repo/query`               | Ask a question about a processed repository        |
| `GET`  | `/api/repo/history`             | Fetch the current user's repository access history |
| `GET`  | `/api/chat?owner=&repo=`        | Load persisted chat messages for a repository      |

All protected endpoints require an `Authorization: Bearer <token>` header. The token is read from `localStorage` automatically by the API utility.

---

## UI Overview

### Pages

**`/login`**
Email and password form. On success, stores the JWT and redirects to `/dashboard`.

**`/register`**
Name, email, and password form. Redirects to `/login` on success.

**`/dashboard`**
Split layout with a sidebar (recent repositories) and a repository input form. Submitting the form navigates to `/repo/:owner/:repo`.

**`/repo/:owner/:repo`**
The main experience page. On load it fetches repository details and checks processing status in parallel. The page renders one of three states:

- **Not processed** — shows repository details and a Process button
- **Processing** — shows a spinner and disables all actions
- **Processed** — shows the chat interface with persistent message history

### Components

**`RepoDetails`**
Displays owner avatar, repository name, description, star/fork/issue counts, a proportional language bar with percentages, recent commits, and a rendered README.

**`ChatBox`**
Loads previous chat messages from the backend on mount. Provides a text input with auto-scroll and a typing indicator while waiting for the AI response.

**`ChatMessage`**
Renders user messages in green right-aligned bubbles and AI messages in dark left-aligned bubbles. AI responses are rendered as Markdown (GFM). Source file references are shown as clickable links pointing to the file on GitHub.

**`SideBar`**
Lists recently accessed repositories for the current user, sorted by last access time. Each entry is clickable and navigates directly to that repository's page.

---

## Future Improvements

- Support for private repositories via GitHub OAuth
- Streaming responses from the LLM
- Ability to clear or delete chat history
- Repository re-processing after code changes
- Search and filter within the sidebar history
- Mobile-responsive layout
- Support for multiple LLM providers selectable per user

---

## License

MIT
