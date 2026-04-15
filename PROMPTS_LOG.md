# PROMPTS_LOG.md

Цей файл фіксує тільки ключові етапи AI-first розробки проєкту **Time Tracker**.

Мікролог дрібних правок не ведеться. Якщо в межах того самого етапу є невелике уточнення без зміни scope, окремий entry не створюється. Після кожного важливого етапу журнал оновлюється, щоб було видно, який prompt запустив зміни, яка логіка була застосована і які файли були змінені.

---

## Entry 000 — Rules and workflow setup

- Етап: Етап 0 — Rules and workflow setup
- Інструмент: Codex
- Branch: `chore/project-scaffold`
- Порядок виконання: Entry 000
- Ключовий промпт: Condensed version — працювати тільки над Етапом 0; перевірити й оновити `AI_WORKFLOW.md`; створити або оновити `PROMPTS_LOG.md`; створити або оновити ранній `README.md`; зафіксувати стек, архітектурні правила, workflow, список етапів, формат логування, старт без Docker і правило окремих git branches для великих фіч; не створювати scaffold, код застосунку, Docker, `.env.example`, `frontend/` або `backend/`.
- Логіка: Зафіксували стек, правила backend/frontend архітектури, AI-first workflow, список етапів і формат логування prompt. Обмежили поточний крок тільки foundation-документацією без переходу до Етапу 1.
- Результат: Створено основу для подальшої покрокової AI-розробки без хаосу.
- Змінені файли:
  - `AI_WORKFLOW.md`
  - `PROMPTS_LOG.md`
  - `README.md`
- Що перевірено:
  - існує `AI_WORKFLOW.md`
  - існує `PROMPTS_LOG.md`
  - існує `README.md`
  - визначено етапи
  - визначено правила workflow
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex у межах Етапу 0.

---

## Entry 001 — Project scaffold

- Етап: Етап 1 — Project scaffold
- Інструмент: Codex
- Branch: `chore/project-scaffold`
- Порядок виконання: Entry 001
- Ключовий промпт: Condensed version — працювати тільки над Етапом 1; створити `frontend/` і `backend/`; додати базові TypeScript/Vite/Tailwind/Express конфіги; додати root support files `.gitignore` і `.env.example`; створити placeholder structure; додати `GET /api/health`; не робити бізнес-логіку, CRUD, timer, reports, CSV export, MongoDB connection, Docker або deploy config; оновити `PROMPTS_LOG.md`.
- Логіка: Створити каркас frontend/backend, root support files і базову структуру без бізнес-логіки. Frontend отримує мінімальний Vite + React + Tailwind setup, backend отримує Express bootstrap із `/api` prefix і health endpoint.
- Результат: Створено стартовий scaffold fullstack проєкту.
- Змінені файли:
  - `.gitignore`
  - `.env.example`
  - `README.md`
  - `PROMPTS_LOG.md`
  - `frontend/package.json`
  - `frontend/tsconfig.json`
  - `frontend/vite.config.ts`
  - `frontend/tailwind.config.js`
  - `frontend/postcss.config.js`
  - `frontend/index.html`
  - `frontend/src/main.tsx`
  - `frontend/src/App.tsx`
  - `frontend/src/index.css`
  - `backend/package.json`
  - `backend/tsconfig.json`
  - `backend/src/app.ts`
  - `backend/src/server.ts`
  - `backend/src/routes/health.routes.ts`
  - `backend/src/controllers/health.controller.ts`
- Що перевірено:
  - frontend scaffold створено
  - backend scaffold створено
  - health endpoint додано
  - Tailwind setup додано
  - `.gitignore` перевірено
  - `.env.example` створено або оновлено
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex у межах Етапу 1.
- Follow-up prompts:
  - Користувач уточнив, що Codex має коментувати хід роботи та оновлювати відповідний entry у `PROMPTS_LOG.md`, а не залишати це як усну домовленість.
  - Користувач уточнив, що Codex має самостійно робити логічні git commits після завершення етапу, а не тільки показувати команди для ручного виконання.

---

## Template for next entries

```md
## Entry XXX — Short title

- Етап:
- Інструмент:
- Branch:
- Дата або порядок виконання:
- Ключовий промпт:
- Логіка:
- Результат:
- Змінені файли:
  - `path/to/file`
- Що перевірено:
  - ...
- Мінімальні ручні правки:
- Follow-up prompts:
  - ...
```
