# Career Reality AI (Meraki Path)

**Career Reality AI** is an AI-powered career evaluation platform that helps science students assess their alignment with 15 different career paths using a 6-category assessment. It provides an encouraging, AI-personalized 4-month preparation roadmap with curated educational resources.

---

## 📁 Repository Structure

```
Meraki-Path/ (repository root)
├── backend/                  # Express.js backend server
│   ├── .env                  # Local secret configuration (gitignored)
│   ├── package-lock.json
│   ├── package.json
│   └── server.js             # Express app serving client builds & Groq API
├── frontend/                 # React + Vite client application
│   ├── .env                  # Local environment file (gitignored)
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── vite.config.js        # Vite config with dev API proxy
├── env/                      # Setup template environment files
│   ├── frontend.env.example
│   └── backend.env.example
├── .gitignore                # Repository-wide ignore rules
└── README.md                 # Setup and project guide (this file)
```

---

## 🛠️ Setup & Local Installation

### 1. Environment Configurations
Create a `.env` file inside `/backend` following the template at `/env/backend.env.example`.
Place your Groq/Gemini API key in `GEMINI_KEY`:
```env
PORT=3001
GEMINI_KEY=your_groq_api_key_here
```

### 2. Install Dependencies
You need to install packages for both the client (frontend) and server (backend). From the root folder, run:

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

---

## 🚀 Running the Project

To run both servers concurrently in development mode (with hot-reloading for both React and Express), run the following command in the **repository root**:
```bash
npm run dev
```

*   **Frontend Client:** accessible at `http://localhost:5173`
*   **Backend Server:** accessible at `http://localhost:3001`
*   *Note: Vite dev server automatically proxies all client requests to `/api/*` to the backend port `3001` to prevent CORS issues.*

### Building and Serving for Production
If you want to compile the frontend and serve it using Express directly:

1. Build the frontend client (from root):
   ```bash
   npm run build
   ```
2. Start the backend server (which automatically serves the compiled `dist/` directory):
   ```bash
   cd backend
   node server.js
   ```
3. Open `http://localhost:3001` in your browser.
