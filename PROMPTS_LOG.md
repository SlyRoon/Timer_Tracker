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

## Entry 003 — Project scaffold verification and completion

- Entry number: Entry 003
- Етап: Етап 1 — Project scaffold
- Інструмент: Codex
- Branch: `chore/project-scaffold`
- Ключовий промпт: Condensed version — працювати тільки в межах Етапу 1; перевірити або створити стартовий fullstack scaffold для Time Tracker; забезпечити `frontend/`, `backend/`, `.gitignore`, `.env.example`, React + TypeScript + Vite + TailwindCSS setup, Node.js + Express + TypeScript setup, placeholder-структуру, стартовий frontend екран і `GET /api/health`; не робити бізнес-логіку, CRUD, timer, reports, CSV, Docker або deploy config; оновити `PROMPTS_LOG.md`, зробити commit і push у `chore/project-scaffold`.
- Original user prompt:
  - Original prompt summary: Користувач повторно запустив Етап 1 і вимагав повного агентського завершення: прочитати workflow files, працювати тільки в branch `chore/project-scaffold`, створити або перевірити scaffold frontend/backend/root files, не переходити до наступного етапу, записати original prompt у `PROMPTS_LOG.md`, виконати `git status`, `git add .`, `git commit` і `git push origin chore/project-scaffold`.
  - Original prompt (verbatim excerpt):

```md
Спочатку прочитай `AI_WORKFLOW.md` і `PROMPTS_LOG.md` у корені проєкту та суворо дотримуйся їх.

Поточна git branch:
`chore/project-scaffold`

Працюй тільки в межах **Етапу 1 — Project scaffold**.
Нову branch не створюй.
Нічого не мердж.
Не переходь до наступного етапу.

Після виконання ти ОБОВ’ЯЗКОВО повинен:
1. самостійно оновити `PROMPTS_LOG.md`
2. записати в `PROMPTS_LOG.md` саме той user prompt, який я тобі надіслав для цього запуску
3. виконати `git status`
4. виконати `git add .`
5. виконати `git commit -m "<логічний commit message>"`
6. виконати `git push origin chore/project-scaffold`

Потрібно створити **тільки стартовий scaffold** для fullstack проєкту Time Tracker.

На цьому етапі треба:
- створити `frontend/`
- створити `backend/`
- створити або оновити `.gitignore`
- створити `.env.example`
- додати базові конфіги
- налаштувати frontend на React + TypeScript + Vite + TailwindCSS
- налаштувати backend на Node.js + Express + TypeScript
- створити placeholder-структуру папок
- зробити базовий frontend стартовий екран
- зробити базовий backend health-check endpoint
- автоматично оновити `PROMPTS_LOG.md`
- зробити commit
- зробити push

На цьому етапі НЕ роби:
- бізнес-логіку
- Project CRUD
- timer start/stop
- today entries logic
- task autocomplete
- reports
- CSV export
- справжні доменні use-cases
- реальні mongoose models
- repositories logic
- services logic
- controllers logic для фіч
- Docker
- deploy config
- зайві бібліотеки
- зайві файли без потреби

Після змін виконай:
1. `git status`
2. `git add .`
3. `git commit -m "chore: scaffold frontend and backend apps"`
4. `git push origin chore/project-scaffold`
```

- Логіка: Перевірити наявний scaffold Етапу 1, не дублювати вже створені файли, не додавати бізнес-логіку, зафіксувати поточний prompt у журналі та завершити цикл git commit/push.
- Результат: Scaffold Етапу 1 перевірено: frontend/backend/root support files уже створені й відповідають вимогам; додаткових scaffold-файлів не потрібно. Prompt log оновлено для цього запуску.
- Змінені файли:
  - `AI_WORKFLOW.md`
  - `PROMPTS_LOG.md`
- Що перевірено:
  - frontend scaffold створено
  - backend scaffold створено
  - health endpoint додано
  - Tailwind setup додано
  - `.gitignore` перевірено
  - `.env.example` створено
  - поточна branch `chore/project-scaffold`
  - не створено нову branch
  - не додано бізнес-логіку, Docker або deploy config
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex.

---

## Entry 004 — Backend domain foundation

- Entry number: Entry 004
- Етап: Етап 2 — Backend domain foundation
- Інструмент: Codex
- Branch: `feat/backend-domain-foundation`
- Ключовий промпт: Condensed version — працювати тільки в межах Етапу 2; створити backend domain foundation для Time Tracker: Mongoose models для `Project`, `TaskName`, `TimeEntry`, базові TypeScript domain types, MongoDB connection layer; не створювати repositories/services/controllers/routes для доменних фіч, не робити CRUD, timer, reports, CSV, frontend changes, Docker або deploy config; оновити `PROMPTS_LOG.md`, зробити commit і push у `feat/backend-domain-foundation`.
- Original user prompt:
  - Original prompt summary: Користувач попросив реалізувати тільки Етап 2 — backend domain foundation у branch `feat/backend-domain-foundation`: створити Mongoose schemas/models для `Project`, `TaskName`, `TimeEntry`, базові TypeScript contracts, MongoDB connection layer з `MONGODB_URI`, інтегрувати connection у backend bootstrap, не переходити до repositories/services/controllers/business endpoints, оновити prompt log, commit і push.
  - Original prompt (verbatim excerpt):

```md
Поточна git branch:
`feat/backend-domain-foundation`

Працюй тільки в межах **Етапу 2 — Backend domain foundation**.
Нову branch не створюй.
Нічого не мердж.
Не переходь до наступного етапу.

Потрібно реалізувати **тільки backend domain foundation** для Time Tracker.

На цьому етапі треба:
- створити доменні моделі для:
  - `Project`
  - `TaskName`
  - `TimeEntry`
- створити Mongoose schemas
- створити базові TypeScript types / interfaces / contracts, якщо вони потрібні
- додати базовий MongoDB connection layer
- підготувати backend до роботи з MongoDB
- не заходити в repository layer
- не заходити в service layer
- не створювати бізнесові endpoints
- автоматично оновити `PROMPTS_LOG.md`
- зробити commit
- зробити push

На цьому етапі НЕ роби:
- repositories logic
- services logic
- controllers logic для доменних фіч
- routes для project/task/time entry фіч
- Project CRUD
- timer start/stop
- today entries management
- autocomplete endpoint
- reports
- CSV export
- frontend changes, крім мінімальних типів якщо це абсолютно потрібно
- Docker
- deploy config
- зайві бібліотеки

Після змін виконай:
1. `git status`
2. `git add .`
3. `git commit -m "feat: add backend domain models and mongo foundation"`
4. `git push origin feat/backend-domain-foundation`
```

- Логіка: Створити базові Mongoose models, TypeScript domain types і MongoDB connection layer без переходу до repositories/services/controllers.
- Результат: Backend готовий до наступного етапу — repository layer.
- Змінені файли:
  - `backend/src/models/project.model.ts`
  - `backend/src/models/task-name.model.ts`
  - `backend/src/models/time-entry.model.ts`
  - `backend/src/shared/types/domain.types.ts`
  - `backend/src/shared/database/mongo-connection.ts`
  - `backend/package-lock.json`
  - `backend/src/server.ts`
  - `README.md`
  - `PROMPTS_LOG.md`
  - `backend/src/models/.gitkeep`
  - `backend/src/shared/.gitkeep`
- Що перевірено:
  - існують моделі `Project`, `TaskName`, `TimeEntry`
  - є MongoDB connection layer
  - health-check scaffold не зламано
  - не додано repository/service/controller logic для доменних фіч
  - backend dependencies встановлено
  - `npm --prefix backend run build` виконано успішно
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex.

---

## Entry 005 — Repository layer

- Entry number: Entry 005
- Етап: Етап 3 — Repository layer
- Інструмент: Codex
- Branch: `feat/backend-repositories`
- Порядок виконання: Entry 005
- Ключовий промпт: Condensed version — працювати тільки в межах Етапу 3; створити repository layer для `Project`, `TaskName`, `TimeEntry`; ізолювати роботу з Mongoose models у repositories; додати data access methods для наступних етапів; не створювати services/controllers/routes/business endpoints, frontend changes, Docker або deploy config; оновити `PROMPTS_LOG.md`, зробити commit і push у `feat/backend-repositories`.
- Original user prompt:
  - Original prompt summary: Користувач попросив реалізувати тільки Етап 3 — Repository layer у branch `feat/backend-repositories`: створити repositories для `Project`, `TaskName`, `TimeEntry`, ізолювати доступ до Mongoose models, підготувати methods для Project CRUD, autocomplete, timer/today entries/reports без service/controller/route/business logic, оновити prompt log з original prompt, виконати backend build, commit і push.
  - Original prompt (verbatim excerpt):

```md
Спочатку прочитай `AI_WORKFLOW.md` і `PROMPTS_LOG.md` у корені проєкту та суворо дотримуйся їх.

Поточна git branch:
`feat/backend-repositories`

Працюй тільки в межах **Етапу 3 — Repository layer**.
Нову branch не створюй.
Нічого не мердж.
Не переходь до наступного етапу.

Потрібно реалізувати **тільки repository layer** для backend Time Tracker.

На цьому етапі треба:
- створити repositories для:
  - `Project`
  - `TaskName`
  - `TimeEntry`
- ізолювати всю роботу з Mongoose models у repository layer
- додати методи, які знадобляться на наступних етапах
- не переходити в service layer
- не переходити в controller layer
- не створювати бізнесові HTTP endpoints
- автоматично оновити `PROMPTS_LOG.md`
- зробити commit
- зробити push

На цьому етапі НЕ роби:
- services logic
- controllers logic
- routes для feature endpoints
- Project CRUD на HTTP-рівні
- timer start/stop business flow
- today entries business flow
- autocomplete business flow
- reports
- CSV export
- frontend changes
- Docker
- deploy config
- зайві бібліотеки

Після змін виконай:
1. `git status`
2. `git add .`
3. `git commit -m "feat: add backend repository layer"`
4. `git push origin feat/backend-repositories`
```

- Логіка: Винести всю роботу з Mongoose models у repository layer і підготувати базові data access methods для projects, task names і time entries.
- Результат: Backend готовий до наступного етапу — service layer.
- Змінені файли:
  - `backend/src/repositories/project.repository.ts`
  - `backend/src/repositories/task-name.repository.ts`
  - `backend/src/repositories/time-entry.repository.ts`
  - `backend/src/repositories/index.ts`
  - `backend/src/shared/types/repository.types.ts`
  - `backend/src/repositories/.gitkeep`
  - `README.md`
  - `PROMPTS_LOG.md`
- Що перевірено:
  - створено `ProjectRepository`
  - створено `TaskNameRepository`
  - створено `TimeEntryRepository`
  - models використовуються через repository layer
  - не додано services/controllers/routes для доменних фіч
  - backend build не зламано
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex.

---

## Entry 006 — Service layer

- Entry number: Entry 006
- Етап: Етап 4 — Service layer
- Інструмент: Codex
- Branch: `feat/backend-services`
- Порядок виконання: Entry 006
- Ключовий промпт: Condensed version — спочатку завершити lifecycle branch `feat/backend-repositories`: switch to `main`, pull, merge, push, delete local/remote branch, створити `feat/backend-services`; потім працювати тільки над Етапом 4, створити service layer поверх repositories для projects, time tracking, today entries, autocomplete і reports; не створювати controllers/routes/HTTP endpoints/frontend/Docker; оновити `PROMPTS_LOG.md`, виконати backend build, commit і push у `feat/backend-services`.
- Original user prompt:
  - Original prompt summary: Користувач попросив закрити попередню feature branch через повний git lifecycle, створити нову branch `feat/backend-services` і реалізувати тільки Етап 4 — Service layer. Потрібно додати project, time tracking, today entries, task autocomplete і reports services поверх repositories, винести бізнес-логіку в services, не додавати controllers/routes/HTTP endpoints/frontend/Docker, оновити prompt log з original prompt, виконати backend build, commit і push.
  - Original prompt (verbatim excerpt):

```md
Поточна завершена feature branch:
`feat/backend-repositories`

Потрібно:
1. завершити branch lifecycle для попереднього етапу
2. перейти до нового етапу
3. виконати тільки **Етап 4 — Service layer**

Перед початком роботи над новим етапом ти ОБОВ’ЯЗКОВО повинен сам пройти git flow для попередньої feature branch.

Виконай послідовно:
1. Перевір поточну branch
2. Перевір, що working tree чистий
3. Переключись у `main`
4. Виконай `git pull origin main`
5. Змерджи `feat/backend-repositories` у `main`
6. Виконай `git push origin main`
7. Видали локальну branch:
   `git branch -d feat/backend-repositories`
8. Спробуй видалити remote branch:
   `git push origin --delete feat/backend-repositories`
9. Створи нову branch:
   `feat/backend-services`
10. Переключись у неї і тільки після цього починай Етап 4

Потрібно реалізувати **тільки service layer** для backend Time Tracker.

На цьому етапі треба:
- створити service layer поверх уже існуючих repositories
- винести в services усю бізнес-логіку
- не створювати controllers
- не створювати routes
- не створювати HTTP endpoints
- не лізти у frontend
- автоматично оновити `PROMPTS_LOG.md`
- зробити commit
- зробити push

Очікуваний підхід:
- `project.service.ts`
- `time-tracking.service.ts`
- `today-entries.service.ts`
- `task-autocomplete.service.ts`
- `reports.service.ts`

Після змін виконай:
1. `git status`
2. `git add .`
3. `git commit -m "feat: add backend service layer"`
4. `git push origin feat/backend-services`
```

- Логіка: Створити service layer поверх repositories і винести бізнес-логіку для projects, time tracking, today entries, autocomplete та reports.
- Результат: Backend готовий до наступного етапу — controllers + validators + middlewares.
- Змінені файли:
  - `backend/src/services/project.service.ts`
  - `backend/src/services/time-tracking.service.ts`
  - `backend/src/services/today-entries.service.ts`
  - `backend/src/services/task-autocomplete.service.ts`
  - `backend/src/services/reports.service.ts`
  - `backend/src/services/service.helpers.ts`
  - `backend/src/services/index.ts`
  - `backend/src/services/.gitkeep`
  - `backend/src/shared/errors/service-error.ts`
  - `backend/src/shared/types/service.types.ts`
  - `backend/src/shared/types/repository.types.ts`
  - `README.md`
  - `PROMPTS_LOG.md`
- Що перевірено:
  - завершено merge lifecycle для `feat/backend-repositories`
  - створено `ProjectService`
  - створено `TimeTrackingService`
  - створено `TodayEntriesService`
  - створено `TaskAutocompleteService`
  - створено `ReportsService`
  - не додано controllers/routes для доменних фіч
  - backend build не зламано
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex.

---

## Entry 007 — Controllers, validators, and middlewares

- Entry number: Entry 007
- Етап: Етап 5 — Controllers + validators + middlewares
- Інструмент: Codex
- Branch: `feat/backend-controllers`
- Порядок виконання: Entry 007
- Ключовий промпт: Condensed version — завершити lifecycle `feat/backend-services`, підтягнути `main`, переконатися що service layer merged, видалити local/remote `feat/backend-services`, створити `feat/backend-controllers`; реалізувати тільки Етап 5: thin controllers поверх services, Zod validators для body/params/query, validation/async/error middlewares, unified response style; не створювати feature routes, не підключати feature endpoints, не лізти у frontend/Docker, оновити README і `PROMPTS_LOG.md`, виконати backend build, commit і push.
- Original user prompt:
  - Original prompt summary: Користувач попросив після завершеного `feat/backend-services` перейти до Етапу 5. Перед реалізацією потрібно виконати git flow: перевірити branch і clean working tree, перейти в `main`, зробити `git pull origin main`, переконатися що main містить service layer, видалити local/remote `feat/backend-services`, створити `feat/backend-controllers`. Далі реалізувати тільки backend controllers, validators і middlewares: тонкі controllers, Zod validation schemas, validation middleware, async wrapper, global error handler з mapping `ServiceError` у HTTP statuses, unified success/error responses, без routes wiring, frontend, Docker або нової бізнес-логіки в controllers.
  - Original prompt (verbatim excerpt):

```md
Попередній етап уже завершено:
`feat/backend-services`

Важливо:
- service layer уже реалізований і був змерджений у `main`
- наступний етап: **Етап 5 — Controllers + validators + middlewares**
- потрібно реалізувати тільки цей етап
- не переходити до routes wiring
- не лізти у frontend
- не додавати Docker
- не додавати нову бізнес-логіку в controllers

Перед початком роботи ОБОВ’ЯЗКОВО виконай git flow для переходу до нового етапу.

Виконай послідовно:
1. Перевір поточну branch
2. Перевір, що working tree чистий
3. Переключись у `main`
4. Виконай `git pull origin main`
5. Переконайся, що `main` актуальний і містить зміни з `feat/backend-services`
6. Якщо локальна branch `feat/backend-services` існує і вже merged, видали її
7. Спробуй видалити remote branch
8. Створи нову branch:
   `feat/backend-controllers`
9. Переключись у неї
10. Тільки після цього починай реалізацію Етапу 5

Потрібно реалізувати **тільки backend controllers + validators + middlewares** для Time Tracker.

Controllers повинні працювати **тільки через service layer**.

Створи validators / schemas для запитів.
Очікувані групи валідації:
- projects
- timer
- today entries
- task autocomplete
- reports

Має бути:
- middleware для валідації через Zod
- базовий async wrapper або інший чистий спосіб обробки async controller errors
- глобальний error handler
- мапінг `ServiceError` -> HTTP status codes

Не можна:
- створювати feature routes
- підключати route modules для доменних фіч в `app.ts`
- реалізовувати route wiring
- лізти у frontend
- переносити бізнес-логіку назад у controllers
- робити CSV export

Після завершення:
1. виконай `git status`
2. переконайся, що зміни логічні й стосуються тільки Етапу 5
3. виконай build backend
4. якщо build падає — виправ помилки
5. `git add .`
6. `git commit -m "feat: add backend controllers and validation layer"`
7. `git push origin feat/backend-controllers`
```

- Логіка: Створити чистий HTTP layer поверх service layer: controllers не містять бізнес-логіки, validators відповідають за Zod validation, middlewares дають validation/async/error handling, response helper уніфікує success/error responses.
- Результат: Backend готовий до наступного етапу — routes wiring, без підключених feature endpoints.
- Змінені файли:
  - `backend/src/app.ts`
  - `backend/src/controllers/health.controller.ts`
  - `backend/src/controllers/project.controller.ts`
  - `backend/src/controllers/time-tracking.controller.ts`
  - `backend/src/controllers/today-entries.controller.ts`
  - `backend/src/controllers/task-autocomplete.controller.ts`
  - `backend/src/controllers/reports.controller.ts`
  - `backend/src/controllers/index.ts`
  - `backend/src/validators/project.validators.ts`
  - `backend/src/validators/timer.validators.ts`
  - `backend/src/validators/today-entries.validators.ts`
  - `backend/src/validators/task-autocomplete.validators.ts`
  - `backend/src/validators/reports.validators.ts`
  - `backend/src/validators/shared.schemas.ts`
  - `backend/src/validators/index.ts`
  - `backend/src/middlewares/validate-request.middleware.ts`
  - `backend/src/middlewares/async-handler.middleware.ts`
  - `backend/src/middlewares/error-handler.middleware.ts`
  - `backend/src/middlewares/index.ts`
  - `backend/src/shared/http/responses.ts`
  - `backend/src/middlewares/.gitkeep`
  - `backend/src/validators/.gitkeep`
  - `README.md`
  - `PROMPTS_LOG.md`
- Що перевірено:
  - `main` актуальний і містить service layer
  - local branch `feat/backend-services` видалено після merge
  - remote branch `feat/backend-services` видалено
  - створено branch `feat/backend-controllers`
  - створено controllers для projects, time tracking, today entries, autocomplete і reports
  - створено Zod validators для потрібних request groups
  - створено validation middleware, async wrapper і global error handler
  - додано unified response helper
  - routes wiring для feature endpoints не реалізовано
  - backend build не зламано
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex.

---

## Entry 008 — Routes wiring

- Entry number: Entry 008
- Етап: Етап 6 — Routes wiring
- Інструмент: Codex
- Branch: `feat/backend-routes`
- Порядок виконання: Entry 008
- Ключовий промпт: Condensed version — завершити lifecycle `feat/backend-controllers`, підтягнути `main`, переконатися що controllers merged, видалити local/remote `feat/backend-controllers`, створити `feat/backend-routes`; реалізувати тільки Етап 6: створити feature route modules для projects, timer, time entries, task names і reports, підключити validators/middlewares/controllers, зареєструвати routes у `app.ts`, не додавати бізнес-логіку, frontend, Docker або CSV export; оновити README і `PROMPTS_LOG.md`, виконати backend build, commit і push.
- Original user prompt:
  - Original prompt summary: Користувач попросив закрити lifecycle `feat/backend-controllers`, створити `feat/backend-routes` і реалізувати тільки Етап 6 — routes wiring. Потрібно створити окремі route modules для projects, timer, time entries, task names і reports; підключити існуючі controllers, validators і middlewares; зареєструвати feature routes в `app.ts`; залишити health route; не додавати нову бізнес-логіку, frontend changes, Docker, deploy config або CSV export; оновити prompt log з original prompt, README, виконати backend build, commit і push.
  - Original prompt (verbatim excerpt):

```md
Попередній етап уже завершено:
`feat/backend-controllers`

Наступний етап:
**Етап 6 — Routes wiring**

Потрібно:
1. завершити git lifecycle для попередньої branch
2. перейти до нового етапу
3. виконати тільки **Етап 6 — Routes wiring**

Перед початком роботи ти ОБОВ’ЯЗКОВО повинен сам пройти git flow для попередньої feature branch.

Виконай послідовно:
1. Перевір поточну branch
2. Перевір, що working tree чистий
3. Переключись у `main`
4. Виконай `git pull origin main`
5. Переконайся, що `main` актуальний і містить зміни з `feat/backend-controllers`
6. Якщо локальна branch `feat/backend-controllers` існує і вже merged, видали її
7. Спробуй видалити remote branch
8. Створи нову branch:
   - `feat/backend-routes`
9. Переключись у неї
10. Тільки після цього починай Етап 6

Потрібно реалізувати **тільки backend routes wiring** для Time Tracker.

На цьому етапі треба:
- створити route modules для всіх основних feature groups
- підключити controllers
- підключити validators / middlewares
- зареєструвати routes у `app.ts`
- зберегти чистий HTTP flow:
  `route -> controller -> service -> repository -> model`
- не лізти у frontend
- не додавати нову бізнес-логіку

Потрібні окремі route files:
1. `projects.routes.ts`
2. `timer.routes.ts`
3. `time-entries.routes.ts`
4. `task-names.routes.ts`
5. `reports.routes.ts`

Після змін виконай:
1. `git status`
2. `git add .`
3. `git commit -m "feat: wire backend feature routes"`
4. `git push origin feat/backend-routes`
```

- Логіка: Підключити feature routes, validators, controllers і app-level route registration без додавання нової бізнес-логіки.
- Результат: Backend готовий до наступного етапу — Project CRUD через вже підключені routes.
- Змінені файли:
  - `backend/src/app.ts`
  - `backend/src/routes/projects.routes.ts`
  - `backend/src/routes/timer.routes.ts`
  - `backend/src/routes/time-entries.routes.ts`
  - `backend/src/routes/task-names.routes.ts`
  - `backend/src/routes/reports.routes.ts`
  - `backend/src/routes/index.ts`
  - `backend/src/controllers/project.controller.ts`
  - `backend/src/controllers/today-entries.controller.ts`
  - `backend/src/models/project.model.ts`
  - `backend/src/models/task-name.model.ts`
  - `backend/src/models/time-entry.model.ts`
  - `backend/src/validators/project.validators.ts`
  - `backend/src/validators/timer.validators.ts`
  - `backend/src/validators/today-entries.validators.ts`
  - `README.md`
  - `PROMPTS_LOG.md`
- Що перевірено:
  - `main` актуальний і містить controllers layer
  - local branch `feat/backend-controllers` видалено після merge
  - remote branch `feat/backend-controllers` видалено
  - створено branch `feat/backend-routes`
  - створено feature route modules
  - feature routes підключено в `app.ts`
  - validators і middlewares підключені
  - health route не зламано
  - backend build не зламано
  - app bootstrap import перевірено після build
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; зміни виконані через Codex.

---

## Entry 009 — Project CRUD

- Entry number: Entry 009
- Етап: Етап 7 — Project CRUD
- Інструмент: Codex
- Branch: `feat/project-crud`
- Порядок виконання: Entry 009
- Ключовий промпт: Condensed version — завершити lifecycle `feat/backend-routes`, підтягнути `main`, змерджити/підтвердити routes wiring, видалити local/remote branch, створити `feat/project-crud`; працювати тільки над Етапом 7: перевірити Project CRUD по всіх шарах, не переписувати коректну реалізацію без потреби, закрити тільки нестачі, перевірити edge cases, вирівняти Mongo DB name на `time_tracker`, оновити `.env.example`, README і `PROMPTS_LOG.md`, виконати backend build, commit і push.
- Original user prompt:
  - Original prompt summary: Користувач повідомив, що Етап 6 завершено і локально протестовано health + Project CRUD happy path та базові validation/error cases. Потрібно завершити git lifecycle `feat/backend-routes`, створити `feat/project-crud` і формально закрити Етап 7 — Project CRUD. Scope: перевірити create/get all/update project і edge cases по всіх шарах `route -> controller -> service -> repository -> model`, не переходити до timer/today/autocomplete/reports/frontend/Docker, вирівняти MongoDB URI на `time_tracker`, оновити README, `.env.example`, `PROMPTS_LOG.md`, виконати build, commit і push.
  - Original prompt (verbatim excerpt):

```md
Поточний стан:
- останній формально завершений етап у `PROMPTS_LOG.md` — **Етап 6 — Routes wiring**
- поточна branch: `feat/backend-routes`
- локально вже протестовано:
  - `GET /api/health`
  - `POST /api/projects`
  - `GET /api/projects`
  - `PATCH /api/projects/:id`
- happy path працює
- базові validation/error cases теж перевірені вручну і не ламають сервер

Тепер потрібно перейти до **Етапу 7 — Project CRUD** і формально завершити його в окремій branch.

Перед початком роботи ти ОБОВ’ЯЗКОВО повинен сам пройти git flow для попередньої feature branch.

Виконай послідовно:
1. Перевір поточну branch
2. Перевір, що working tree чистий
3. Переключись у `main`
4. Виконай `git pull origin main`
5. Змерджи `feat/backend-routes` у `main`
6. Виконай `git push origin main`
7. Видали локальну branch:
   `git branch -d feat/backend-routes`
8. Спробуй видалити remote branch:
   `git push origin --delete feat/backend-routes`
9. Створи нову branch:
   `feat/project-crud`
10. Переключись у неї і тільки після цього починай Етап 7

Потрібно реалізувати **тільки Етап 7 — Project CRUD** для backend Time Tracker.

Що треба зробити в межах цього етапу:
- перевірити поточну реалізацію project CRUD
- якщо `create project`, `get all projects`, `update project` уже реалізовані коректно, не переписувати їх без потреби
- закрити лише те, чого ще бракує для формального завершення Етапу 7
- переконатися, що Project CRUD стабільний і узгоджений по всіх шарах:
  `route -> controller -> service -> repository -> model`

Окремо перевір Mongo/env alignment:
- локальна MongoDB база має бути:
  `time_tracker`
- якщо в `.env.example`, README або інших документах досі стоїть `time-tracker`, виправити на `time_tracker`

Після змін виконай:
1. `git status`
2. `npm --prefix backend run build`
3. якщо build падає — виправ тільки те, що стосується Етапу 7
4. `git add .`
5. `git commit -m "feat: implement project crud endpoints"`
6. `git push origin feat/project-crud`
```

- Логіка: Перевірити й формально закрити Project CRUD без переписування вже коректної реалізації; підтвердити стабільний flow через routes/controllers/services/repositories/models і вирівняти MongoDB URI на `time_tracker`.
- Результат: Project CRUD формально завершено; backend готовий до наступного етапу — Timer start / stop backend.
- Змінені файли:
  - `.env.example`
  - `README.md`
  - `PROMPTS_LOG.md`
- Що перевірено:
  - завершено lifecycle `feat/backend-routes`
  - створено branch `feat/project-crud`
  - `POST /api/projects` реалізовано через route/controller/service/repository/model
  - `GET /api/projects` реалізовано через route/controller/service/repository/model
  - `GET /api/projects/:id` реалізовано через route/controller/service/repository/model
  - `PATCH /api/projects/:id` реалізовано через route/controller/service/repository/model
  - empty `name` і empty `color` покриті Zod validation
  - invalid project id покритий Zod validation
  - not found project id мапиться через `ServiceError` у unified error response
  - empty update payload покритий Zod validation і service guard
  - happy path і базові validation/error cases перевірені вручну користувачем локально
  - `.env.example` використовує MongoDB database `time_tracker`
  - backend build не зламано
- Мінімальні ручні правки: Не було окремих ручних правок поза Codex; локальні pre-existing `.env.example` і template-правка `PROMPTS_LOG.md` були збережені через stash і перенесені в branch `feat/project-crud`.

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
```

