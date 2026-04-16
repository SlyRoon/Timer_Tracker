# Time Tracker

Fullstack Time Tracker app для тестового завдання на позицію **AI Web Developer**.

## Stack

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS

### Backend
- Node.js
- Express
- TypeScript

### Database
- MongoDB
- Mongoose

### Utilities
- Zod
- dotenv
- cors

## Backend Architecture

Backend планується як багатошаровий Express + TypeScript застосунок:
- routes
- controllers
- services
- repositories
- models
- middlewares
- validators
- shared

Основний потік:

```text
route -> controller -> service -> repository -> model -> MongoDB
```

Routes тільки реєструють endpoints, controllers відповідають за HTTP-рівень, services містять бізнес-логіку, repositories ізолюють доступ до MongoDB через Mongoose models, validators відповідають за Zod validation.

## Frontend Architecture

Frontend планується як React + TypeScript + Vite застосунок з розділенням відповідальностей:
- pages
- components
- features
- hooks
- api
- types
- utils
- shared

UI components мають бути переважно презентаційними. API calls мають бути зосереджені в api layer. Повторно використовувана логіка має виноситися в hooks або features, а не накопичуватися в page components.

## AI-first Workflow

Проєкт розробляється покроково через AI/Codex workflow.

Головні правила:
- `AI_WORKFLOW.md` є основною інструкцією для наступних AI/Codex кроків.
- `PROMPTS_LOG.md` фіксує тільки ключові етапи, без мікрологу дрібних правок.
- Робота виконується по одному етапу за раз.
- Великі фічі виконуються в окремих git branches.
- На старті проєкт працює без Docker.

## Current Status

Зараз завершено **Етап 7 — Project CRUD**.

Стартовий scaffold, backend domain foundation, repository layer, service layer, HTTP layer baseline і routes wiring створено:
- `frontend/` створено з React, TypeScript, Vite і TailwindCSS setup;
- `backend/` створено з Node.js, Express і TypeScript setup;
- додано базовий `GET /api/health`;
- додано `.gitignore` і `.env.example`.
- додано Mongoose models для `Project`, `TaskName`, `TimeEntry`;
- додано базові backend domain types;
- додано базовий MongoDB connection layer.
- додано repository layer для `Project`, `TaskName`, `TimeEntry`.
- додано service layer для projects, time tracking, today entries, autocomplete і reports.
- додано controllers, Zod validators, validation middleware, async handler, global error handler і unified response helpers.
- підключено feature route modules для projects, timer, time entries, task names і reports.
- формально перевірено Project CRUD flow для create, get all, get by id і update project.
- MongoDB local database name зафіксовано як `time_tracker`.

Код застосунку ще не реалізований:
- timer start/stop ще не перевірено як окремий функціональний етап;
- today entries management ще не перевірено як окремий функціональний етап;
- task autocomplete ще не перевірено як окремий функціональний етап;
- reports і CSV export ще не завершені як окремі функціональні етапи;
- frontend feature implementation ще не реалізована;
- Docker setup не додано.

## Planned Phases

1. Етап 0 — Rules and workflow setup
2. Етап 1 — Project scaffold
3. Етап 2 — Backend domain foundation
4. Етап 3 — Repository layer
5. Етап 4 — Service layer
6. Етап 5 — Controllers + validators + middlewares
7. Етап 6 — Routes wiring
8. Етап 7 — Project CRUD
9. Етап 8 — Timer start / stop backend
10. Етап 9 — Today entries management backend
11. Етап 10 — Task autocomplete backend
12. Етап 11 — Reports + CSV backend
13. Етап 12 — Frontend foundation
14. Етап 13 — Tracker UI
15. Етап 14 — Today entries UI
16. Етап 15 — Projects UI
17. Етап 16 — Reports UI
18. Етап 17 — Integration polish
19. Етап 18 — Docs + submission
