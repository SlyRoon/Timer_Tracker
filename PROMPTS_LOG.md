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

## Entry 002 — Mandatory prompt logging, commit, and push workflow

- Entry number: Entry 002
- Етап: Workflow rules update — mandatory prompt logging, commit, and push
- Інструмент: Codex
- Branch: `chore/project-scaffold`
- Ключовий промпт: Зафіксувати обов'язковий режим роботи AI-агента: після кожного виконаного prompt оновлювати `PROMPTS_LOG.md`, зберігати original user prompt, самостійно виконувати `git add`, `git commit`, `git push` у поточну branch і показувати результат push.
- Original user prompt:
  - Original prompt summary: Користувач уточнив, що Codex має працювати як AI-агент з повним циклом завершення задачі: читати workflow files, оновлювати prompt log після кожного prompt, записувати original user prompt, самостійно commit-ити і push-ити зміни в поточну branch, а у фінальній відповіді показувати `PROMPTS_LOG.md`, commit, push і перевірки.
  - Original prompt (verbatim excerpt):

```md
Спочатку прочитай `AI_WORKFLOW.md` і `PROMPTS_LOG.md` у корені проєкту та суворо дотримуйся їх.

Ти працюєш не просто як генератор коду, а як AI-агент, який зобов’язаний:
1. виконати поточний етап
2. самостійно оновити `PROMPTS_LOG.md`
3. самостійно зробити git add
4. самостійно зробити git commit
5. самостійно зробити git push у поточну branch
6. наприкінці показати, що саме було запушено

Після кожного виконаного мною промпта ти ОБОВ’ЯЗКОВО оновлюєш `PROMPTS_LOG.md`.
У `PROMPTS_LOG.md` ти ОБОВ’ЯЗКОВО зберігаєш:
- назву етапу
- branch
- коротку логіку
- результат
- змінені файли
- що перевірено
- мінімальні ручні правки
- і головне: **оригінальний user prompt, який я тобі надіслав**

Ти НЕ маєш права завершити задачу без оновлення `PROMPTS_LOG.md`.
Ти НЕ маєш права завершити задачу без спроби `git commit`.
Ти НЕ маєш права завершити задачу без спроби `git push`.

Після внесення змін виконай:
- `git status`
- `git add .`
- `git commit -m "<логічний commit message>"`
- `git push origin <current-branch>`
```

- Логіка: Оновити workflow contract у `AI_WORKFLOW.md` і додати новий запис у `PROMPTS_LOG.md`, щоб future prompts мали обов'язковий audit trail з original prompt, commit і push спробою.
- Результат: Правила ведення prompt log і git-завершення задачі зафіксовано в проєктній документації.
- Змінені файли:
  - `AI_WORKFLOW.md`
  - `PROMPTS_LOG.md`
- Що перевірено:
  - прочитано `AI_WORKFLOW.md`
  - прочитано `PROMPTS_LOG.md`
  - визначено поточну branch `chore/project-scaffold`
  - перед змінами working tree був чистий
  - додано новий entry з полем `Original user prompt`
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex.

---

## Template for next entries

```md
## Entry XXX — Short title

- Етап:
- Інструмент:
- Branch:
- Дата або порядок виконання:
- Ключовий промпт:
- Original user prompt:
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
