# Time Tracker

Fullstack Time Tracker для тестового завдання на позицію AI Web Developer. Проєкт реалізований end-to-end: React frontend, Express backend, MongoDB persistence, валідація через Zod, prompt logging, staged AI-first workflow, responsive UI, перемикач мови `uk/en`, accent theme switcher і CSV export для звітів.

Це не демо-макет і не scaffold. У репозиторії є робочий frontend, API, MongoDB data layer, typed contracts і розділення відповідальностей між UI, hooks/features, API client, services, repositories та models.

## English Quick Overview

Time Tracker is a fullstack work-time tracking app built as an AI-first test task. It uses React + TypeScript + Vite + TailwindCSS on the frontend, Node.js + Express + TypeScript on the backend, and MongoDB + Mongoose for persistence.

Implemented flows include Start/Stop timer, active timer, task autocomplete, project management with colors, today entries editing, grouped project totals, day/week/month reports, CSV export, Ukrainian/English language switching, accent theme switching, and responsive UI polish.

Local run is straightforward: install dependencies, start MongoDB locally, run the backend on `http://localhost:5000/api`, run the frontend on `http://localhost:5173`, then create a project and start tracking time.

## Status / Demo

Current status:

- fullstack app is implemented;
- backend and frontend builds pass;
- local MongoDB database name is `time_tracker`;
- Docker is intentionally not included;
- live deployment URL is not committed here yet;
- repository is ready for local review and future deployment.

Demo link placeholder:

```text
Live URL: add after deployment
Repository: GitHub repository with this codebase
```

## Tech Stack

Frontend:

- React 19 with TypeScript;
- Vite for local development and production build;
- TailwindCSS as the single styling system;
- `i18next` + `react-i18next` for `uk/en` UI localization;
- `react-icons` for restrained visual iconography.

Backend:

- Node.js;
- Express;
- TypeScript;
- `dotenv` for environment variables;
- `cors` for frontend/backend integration.

Database and validation:

- MongoDB as the local database;
- Mongoose for schemas, ObjectId references and model boundaries;
- Zod for request validation;
- centralized async/error handling and unified API responses.

The stack is intentionally small. There is no Redux, React Query, UI framework, Docker layer or extra infrastructure package added just for convenience.

## Architecture

Backend request flow:

```text
route -> controller -> service -> repository -> model -> MongoDB
```

Backend responsibilities:

- `routes` register endpoints and attach validators/middlewares;
- `controllers` handle HTTP request/response only;
- `services` contain business rules and domain flow;
- `repositories` isolate Mongoose data access;
- `models` define Mongoose schemas/models;
- `validators` define Zod schemas for `body`, `params` and `query`;
- `middlewares` handle validation, async wrappers and global errors;
- `shared` contains database helpers, response helpers, service errors and shared types.

Frontend structure follows the same separation idea:

- `api` contains backend client functions;
- `features` contain feature-level hooks and UI blocks;
- `components` contain shell/shared UI components;
- `pages` are thin route-level wrappers;
- `hooks` contain shared client-side logic;
- `i18n` contains language setup and JSON resources;
- `shared` contains route/theme config;
- `types` contains shared frontend contracts;
- `utils` contains formatting/conversion helpers.

API calls stay in the API layer. Feature state lives in hooks/features. Presentation components do not talk directly to the backend. The project avoids the “everything in one file” anti-pattern.

## Implemented Features

Tracker:

- task name input;
- task autocomplete based on previous task names;
- project dropdown;
- Start / Stop timer;
- active timer block visible at the top of the tracker screen;
- prevention of multiple active timers on the backend;
- task usage metadata update through `TaskName.lastUsedAt`.

Today entries:

- list of today’s time entries;
- edit task name;
- edit project;
- manual time correction;
- manual duration input in `HH:MM` format on the frontend;
- delete entry;
- grouped entries by project;
- totals by project;
- loading, error and empty states.

Projects:

- projects page;
- create project;
- update project name and color;
- color display in lists and entry summaries.

Reports:

- day report;
- week report;
- month report;
- period totals;
- grouped report output;
- CSV export endpoint and frontend export button.

UI / UX:

- app shell with navigation between Tracker, Projects and Reports;
- Ukrainian / English language switch with localStorage persistence;
- default UI language is Ukrainian;
- accent theme switcher with presets `emerald`, `blue`, `violet`, `amber`, `rose`;
- accent theme persistence in localStorage;
- responsive layout polish for mobile, tablet and desktop;
- visual iconography through `react-icons`;
- production-like card layout for tracker, today entries, projects and reports.

AI workflow:

- staged AI-first implementation;
- prompt logging in `PROMPTS_LOG.md`;
- working rules and architecture constraints in `AI_WORKFLOW.md`;
- feature branches used for major implementation stages.

## Project Structure

Compact structure overview:

```text
root/
  AI_WORKFLOW.md
  PROMPTS_LOG.md
  README.md
  .env.example
  backend/
    package.json
    tsconfig.json
    src/
      app.ts
      server.ts
      controllers/
      middlewares/
      models/
      repositories/
      routes/
      services/
      shared/
      validators/
  frontend/
    package.json
    tsconfig.json
    vite.config.ts
    tailwind.config.js
    postcss.config.js
    src/
      api/
      components/
      features/
      hooks/
      i18n/
      pages/
      shared/
      types/
      utils/
```

## Local Setup

Prerequisites:

- Node.js;
- npm;
- local MongoDB running on `localhost:27017`.

Install dependencies from the repository root:

```powershell
npm --prefix backend install
npm --prefix frontend install
```

MongoDB local connection:

```text
mongodb://localhost:27017/time_tracker
```

Start backend in one terminal:

```powershell
$env:PORT="5000"
$env:MONGODB_URI="mongodb://localhost:27017/time_tracker"
$env:CLIENT_URL="http://localhost:5173"
npm --prefix backend run dev
```

Start frontend in another terminal:

```powershell
$env:VITE_API_BASE_URL="http://localhost:5000/api"
npm --prefix frontend run dev
```

Open:

```text
Frontend: http://localhost:5173
Backend API: http://localhost:5000/api
Health check: http://localhost:5000/api/health
```

Recommended manual review flow:

1. Create a project on the Projects page.
2. Open Tracker.
3. Enter a task name and start a timer.
4. Stop the timer.
5. Review today entries and grouped totals.
6. Edit task/project/manual time.
7. Open Reports and export CSV.
8. Switch language and accent theme.

## Environment Variables

The repository includes `.env.example` as a safe reference:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/time_tracker
CLIENT_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000/api
```

Meaning:

- `PORT` - backend server port;
- `MONGODB_URI` - MongoDB connection string;
- `CLIENT_URL` - frontend origin allowed by backend CORS;
- `VITE_API_BASE_URL` - frontend API base URL.

Do not commit real secrets. For local runs, either export env variables in the terminal as shown above, or create local untracked env files such as `backend/.env` and `frontend/.env.local`.

## Available Scripts

Backend scripts:

```powershell
npm --prefix backend run dev
npm --prefix backend run build
npm --prefix backend run start
```

Frontend scripts:

```powershell
npm --prefix frontend run dev
npm --prefix frontend run build
npm --prefix frontend run preview
```

Build checks:

```powershell
npm --prefix backend run build
npm --prefix frontend run build
```

## API Overview

Health:

- `GET /api/health`

Projects:

- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`

Timer:

- `POST /api/timer/start`
- `POST /api/timer/stop`
- `GET /api/timer/active`

Time entries:

- `GET /api/time-entries/today`
- `GET /api/time-entries/today/grouped`
- `GET /api/time-entries/today/totals`
- `PATCH /api/time-entries/:id/task-name`
- `PATCH /api/time-entries/:id/project`
- `PATCH /api/time-entries/:id/manual-time`
- `DELETE /api/time-entries/:id`

Task names:

- `GET /api/task-names/suggestions?query=<text>&limit=<number>`
- `GET /api/task-names/recent?limit=<number>`

Reports:

- `GET /api/reports?period=day|week|month&date=<ISO-date>`
- `GET /api/reports/day?date=<ISO-date>`
- `GET /api/reports/week?date=<ISO-date>`
- `GET /api/reports/month?date=<ISO-date>`
- `GET /api/reports/export?period=day|week|month&date=<ISO-date>&format=csv`

CSV export can be checked directly in the browser after backend startup:

```text
http://localhost:5000/api/reports/export?period=day&date=2026-04-17&format=csv
```

Successful JSON responses use:

```json
{
  "success": true,
  "data": {}
}
```

Error responses use:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Readable error message"
  }
}
```

Service error mapping:

- `VALIDATION_ERROR` -> `400`;
- `NOT_FOUND` -> `404`;
- `CONFLICT` -> `409`;
- unknown errors -> `500`.

## AI-First Workflow

This project was built stage by stage with Codex as an AI engineering agent. The repository includes two workflow artifacts:

- `AI_WORKFLOW.md` - rules, stack, architecture constraints, roadmap and git workflow;
- `PROMPTS_LOG.md` - key prompts, stage summaries, changed files and verification notes.

The implementation intentionally avoided one-shot generation. Major features were developed in separate branches, verified with builds or local checks, then merged forward. This makes the work easier to review and keeps the prompt history reproducible.

## MongoDB + Mongoose Rationale

MongoDB + Mongoose is a practical fit for this Time Tracker. The core data is document-friendly: projects, task name history and time entries are simple collections with clear references. Mongoose adds schemas, timestamps, ObjectId references and a clean model boundary while keeping the persistence layer lightweight.

The repository keeps all database access inside repositories, so the rest of the backend does not depend directly on Mongoose models.

## Deployment Notes

There is no Docker setup in this repository.

Suggested production setup:

1. Deploy MongoDB to a hosted provider such as MongoDB Atlas.
2. Deploy backend to a Node-capable platform.
3. Set backend env variables:
   - `PORT`
   - `MONGODB_URI`
   - `CLIENT_URL`
4. Build and start backend:

```powershell
npm --prefix backend run build
npm --prefix backend run start
```

5. Deploy frontend as a static Vite build.
6. Set frontend `VITE_API_BASE_URL` to the deployed backend API URL.
7. Build frontend:

```powershell
npm --prefix frontend run build
```

8. Publish `frontend/dist`.

Make sure backend CORS `CLIENT_URL` matches the deployed frontend URL.

## Submission Notes

Submission package includes:

- working fullstack Time Tracker code;
- backend and frontend source;
- local setup instructions;
- API overview;
- AI workflow rules;
- prompt log;
- build scripts;
- deployment notes.

Verified project state:

- backend build passes;
- frontend build passes;
- tracker, today entries, projects, reports and CSV flows were checked during staged implementation and polish passes;
- `uk/en` language switching, accent theme switching and responsive render checks were covered during post-submission polish;
- no real secrets are committed;
- Docker is not part of the current submission.

