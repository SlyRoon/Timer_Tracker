# Time Tracker

Fullstack Time Tracker application built for an AI Web Developer test task.

The project is implemented end-to-end: React frontend, Express backend, MongoDB persistence, typed API contracts, validation, prompt logging, and a staged AI-first development workflow.

## Project Overview

Time Tracker helps a user track work by project and task name. The app supports:

- starting and stopping a timer;
- viewing the active timer;
- autocomplete for previously used task names;
- managing projects and colors;
- reviewing today's entries;
- editing task name, project, and manual time corrections;
- grouping today's entries by project;
- viewing day, week, and month reports;
- exporting report data as CSV.

## Tech Stack

Frontend:

- React
- TypeScript
- Vite
- TailwindCSS

Backend:

- Node.js
- Express
- TypeScript

Database:

- MongoDB
- Mongoose

Validation and infrastructure:

- Zod
- dotenv
- cors

## Architecture

The backend follows a layered architecture:

```text
route -> controller -> service -> repository -> model -> MongoDB
```

Layer responsibilities:

- `routes`: register endpoints and attach middleware only.
- `controllers`: handle HTTP request/response work and call services.
- `services`: contain business rules and domain flow.
- `repositories`: isolate all Mongoose data access.
- `models`: define Mongoose schemas and models only.
- `validators`: define Zod schemas for body, params, and query.
- `middlewares`: validation, async handling, and global error handling.
- `shared`: reusable types, HTTP helpers, errors, and database utilities.

The frontend is organized by pages, feature modules, shared UI, hooks, API clients, and shared types:

```text
frontend/src/
  api/
  components/
  features/
  hooks/
  pages/
  shared/
  types/
  utils/
```

Page components stay thin. API calls live in `frontend/src/api`, feature state lives in hooks/features, and UI components are kept mostly presentational.

## MongoDB Choice

MongoDB + Mongoose is a deliberate choice for this Time Tracker implementation. The domain is document-friendly: projects, task name history, and time entries can be represented cleanly as collections with simple references. Mongoose provides schemas, validation at the persistence boundary, ObjectId references, timestamps, and a lightweight model layer without introducing a heavier SQL/ORM setup.

The local database name is:

```text
time_tracker
```

## Implemented Features

Backend:

- Health check: `GET /api/health`
- Project CRUD baseline:
  - create project
  - list projects
  - get project by id
  - update project
- Timer flow:
  - start timer
  - stop active timer
  - get active timer
  - prevent multiple active timers
  - update task name usage metadata
- Today entries management:
  - list today's entries
  - update task name
  - update project
  - manual time correction
  - delete entry
  - grouped entries by project
  - totals by project
- Task autocomplete:
  - recent task names
  - filtered suggestions by query
  - limit validation
- Reports:
  - day report
  - week report
  - month report
  - totals and grouped output
  - CSV export
- Unified JSON response style for successful and failed API responses.
- Zod validation and centralized error handling.

Frontend:

- App shell with navigation.
- Tracker page:
  - task input
  - autocomplete dropdown
  - project select
  - start/stop timer flow
  - active timer panel
  - loading and error states
- Today entries UI:
  - list entries
  - edit task/project
  - manual time correction
  - delete entry
  - grouped totals
- Projects UI:
  - list projects
  - create project
  - edit project name and color
- Reports UI:
  - day/week/month period switch
  - totals summary
  - grouped report table
  - CSV export button

## Project Structure

```text
root/
  AI_WORKFLOW.md
  PROMPTS_LOG.md
  README.md
  .env.example
  backend/
    package.json
    package-lock.json
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
      pages/
      shared/
      types/
      utils/
```

## Local Setup

Prerequisites:

- Node.js
- npm
- MongoDB running locally on port `27017`

Install dependencies from the repository root:

```powershell
npm --prefix backend install
npm --prefix frontend install
```

Start MongoDB locally and make sure this connection works:

```text
mongodb://localhost:27017/time_tracker
```

## Environment Variables

The repository contains `.env.example` with safe local defaults:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/time_tracker
CLIENT_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000/api
```

Do not commit real secrets or private connection strings.

For local PowerShell sessions, you can export the variables before starting the apps:

```powershell
$env:PORT="5000"
$env:MONGODB_URI="mongodb://localhost:27017/time_tracker"
$env:CLIENT_URL="http://localhost:5173"
npm --prefix backend run dev
```

In a second terminal:

```powershell
$env:VITE_API_BASE_URL="http://localhost:5000/api"
npm --prefix frontend run dev
```

Open the frontend at:

```text
http://localhost:5173
```

The backend API runs at:

```text
http://localhost:5000/api
```

## Available Scripts

Backend:

```powershell
npm --prefix backend run dev
npm --prefix backend run build
npm --prefix backend run start
```

Frontend:

```powershell
npm --prefix frontend run dev
npm --prefix frontend run build
npm --prefix frontend run preview
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

CSV export can be checked in the browser or with a request such as:

```text
http://localhost:5000/api/reports/export?period=day&date=2026-04-17&format=csv
```

## Response Style

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

Common error mappings:

- `VALIDATION_ERROR` -> `400`
- `NOT_FOUND` -> `404`
- `CONFLICT` -> `409`
- unknown errors -> `500`

## AI-First Workflow

This project was developed stage by stage with Codex as an AI engineering agent.

Workflow files:

- `AI_WORKFLOW.md` defines the working rules, architecture constraints, allowed stack, staged roadmap, git workflow, and prompt logging policy.
- `PROMPTS_LOG.md` records the key implementation prompts and results for each major stage.

The project intentionally avoided generating everything in one pass. Each large feature was implemented in a separate branch and merged only after build or local verification.

## Deployment Notes

No Docker setup is included. Docker was intentionally kept out of scope for this staged implementation.

Backend deployment:

1. Configure production environment variables:
   - `PORT`
   - `MONGODB_URI`
   - `CLIENT_URL`
2. Use a hosted MongoDB instance such as MongoDB Atlas.
3. Build the backend:

```powershell
npm --prefix backend run build
```

4. Run the compiled server:

```powershell
npm --prefix backend run start
```

Frontend deployment:

1. Set `VITE_API_BASE_URL` to the deployed backend API URL.
2. Build the frontend:

```powershell
npm --prefix frontend run build
```

3. Publish `frontend/dist` to a static hosting provider.

The frontend and backend can be deployed separately. Make sure backend CORS `CLIENT_URL` matches the deployed frontend URL.

## Submission Notes

Current final status:

- Stage 18 - Docs + submission is complete.
- The app works as a fullstack Time Tracker.
- Backend and frontend builds pass.
- The prompt log and workflow files are included for review.
- Docker is not included.
- No real secrets are committed.

Recommended reviewer flow:

1. Start MongoDB locally.
2. Install backend and frontend dependencies.
3. Start backend with `MONGODB_URI=mongodb://localhost:27017/time_tracker`.
4. Start frontend with `VITE_API_BASE_URL=http://localhost:5000/api`.
5. Open `http://localhost:5173`.
6. Create a project.
7. Start and stop a timer.
8. Review today's entries.
9. Open reports and export CSV.
