# AI_WORKFLOW.md

## Роль і режим роботи

Ти допомагаєш створювати fullstack веб-додаток **Time Tracker** для тестового завдання на позицію **AI Web Developer**.

Працюй у форматі **AI-first workflow**:
- не намагайся згенерувати весь проєкт одним кроком;
- рухайся тільки поетапно;
- за один раз виконуй лише одну чітко визначену задачу;
- не ламай вже погоджену архітектуру;
- не змішуй кілька великих фіч в одному кроці;
- перед змінами орієнтуйся на структуру цього файлу та поточний стан проєкту.

---

## Головна ціль

Потрібно зібрати **робочий fullstack Time Tracker app** з:
- frontend
- backend
- database
- clean architecture
- README
- PROMPTS_LOG.md
- deploy-ready structure

---

## Стек проєкту

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

---

## Backend architecture

На бекенді обов’язково використовуй багатошарову архітектуру з такими шарами:

- routes
- controllers
- services
- repositories
- models
- middlewares
- validators
- shared

### Правила
- `routes` тільки реєструють endpoints і middlewares
- `controllers` працюють тільки з HTTP-рівнем: `req`, `res`, `next`
- `services` містять тільки бізнес-логіку
- `repositories` містять тільки роботу з базою даних
- `models` містять тільки Mongoose schema
- не можна класти доступ до БД у controllers
- не можна класти HTTP-логіку у services
- services не повинні напряму працювати з Mongoose models, якщо вже є repository layer

### Обов’язковий потік
`route -> controller -> service -> repository -> model -> MongoDB`

---

## Frontend architecture

На фронтенді потрібно розділити:

- presentation/UI
- state/logic
- API client layer
- shared types / utils

### Рекомендовані папки
- pages
- components
- features
- hooks
- api
- types
- utils
- shared

### Правила
- UI-компоненти мають бути переважно презентаційними
- API-виклики мають бути винесені в `api` layer
- повторно використовувану логіку треба виносити в `hooks` або `features`
- не можна складати всю логіку в page components

---

## Доменні сутності

### Project
- `name: string`
- `color: string`

### TaskName
- `value: string`
- `lastUsedAt: Date`

### TimeEntry
- `taskName: string`
- `projectId: ObjectId` reference to Project
- `startTime: Date`
- `endTime: Date | null`
- `durationMinutes: number`
- `entryDate: Date`

---

## Обов’язковий функціонал

### 1. Основний time tracker
- Start / Stop
- поле введення назви задачі
- autocomplete з попередніх задач
- dropdown вибору проєкту
- активний таймер зверху сторінки

### 2. Управління записами часу
- список сьогоднішніх записів
- редагування task name
- редагування project
- ручне коригування часу у форматі `hh:mm`
- видалення запису
- групування записів за проєктами
- показ загального часу по кожному проєкту

### 3. Управління проєктами
- окрема сторінка або секція
- додавання проєкту
- редагування проєкту
- присвоєння кольору проєкту

### 4. Звіти
- day / week / month
- CSV export

---

## Правила роботи з git

Працюй через практичний git workflow.

### Основні правила
- для кожної великої фічі створюй окрему branch
- одна branch = одна фіча
- не змішуй непов’язані зміни в одній branch
- коміти повинні бути маленькі, зрозумілі і логічно згруповані
- після завершення задачі коротко підсумуй, що було змінено
- вважай, що кожна branch буде перевірятись окремо вручну

### Приклади назв гілок
- `chore/project-scaffold`
- `feat/backend-foundation`
- `feat/project-crud`
- `feat/time-entry-start-stop`
- `feat/today-entries-management`
- `feat/task-autocomplete`
- `feat/reports-csv`
- `feat/frontend-tracker-ui`
- `chore/final-polish`

### Формат комітів
Використовуй короткі логічні commit messages, наприклад:
- `chore: scaffold frontend and backend apps`
- `feat: add project mongoose model and repository`
- `feat: implement time entry start and stop flow`
- `feat: add reports service and csv export`
- `docs: update readme and prompts log`

Якщо зміни дуже великі, розбий їх на кілька комітів за змістом, а не одним великим комітом.

---

## Правила роботи з PROMPTS_LOG.md

Перед новим великим кроком подивись поточний `PROMPTS_LOG.md` і не дублюй старі етапи.

Після кожного важливого етапу додай новий запис у `PROMPTS_LOG.md` з:
- назвою етапу
- назвою інструменту
- назвою branch
- ключовим промптом
- короткою логікою
- коротким результатом
- списком змінених файлів
- тим, що було перевірено
- мінімальними ручними правками, якщо вони були

Не веди мікролог дрібниць. Логуй тільки **ключові етапи** і важливі follow-up промпти.

---

## Порядок фаз

Працюй тільки в такій послідовності, якщо не сказано інше.

### Фаза 1 — Scaffold
Створи тільки каркас проєкту:
- `frontend/`
- `backend/`
- базові конфіги
- Tailwind setup
- Express bootstrap
- TypeScript configs
- placeholder structure
- root documentation files

### Фаза 2 — Models
Створи:
- доменні моделі
- mongoose schemas
- backend types
- shared types where needed

### Фаза 3 — Repositories
Створи repository layer для:
- projects
- task names
- time entries

### Фаза 4 — Services
Створи service layer з бізнес-логікою:
- projects
- time tracking
- today entries management
- reports
- autocomplete

### Фаза 5 — Controllers
Створи controller layer без доступу до БД напряму.

### Фаза 6 — Routes
Зареєструй routes і зв’яжи модулі.

### Фаза 7 — Project CRUD
Реалізуй:
- create project
- get projects
- update project

### Фаза 8 — Timer start / stop
Реалізуй:
- start timer
- stop timer
- active timer retrieval

### Фаза 9 — Today entries management
Реалізуй:
- list today entries
- update task name
- update project
- manual duration correction
- delete entry
- grouping by project
- totals by project

### Фаза 10 — Task autocomplete
Реалізуй пошук попередніх назв задач.

### Фаза 11 — Reports
Реалізуй звіти:
- day
- week
- month

### Фаза 12 — CSV export
Додай експорт звітів у CSV.

### Фаза 13 — Frontend pages and UI
Реалізуй:
- pages
- feature modules
- hooks
- api client layer
- tracker UI
- projects UI
- reports UI

### Фаза 14 — Final polish
Зроби:
- фінальне вирівнювання структури
- cleanup
- README update
- PROMPTS_LOG cleanup
- deploy-ready improvements

---

## Що не можна робити

- не звалюй всю логіку в один файл
- не прибирай controller layer
- не клади роботу з БД у controllers
- не клади HTTP-логіку у services
- не роби page components занадто “товстими”
- не рефактори непов’язаний код без причини
- не змінюй стек без прямої потреби
- не переходь до наступної фази, якщо поточна не завершена

---

## Формат відповіді після кожного виконаного кроку

Після завершення задачі дай короткий звіт у такому форматі:

### Що зроблено
- ...

### Які файли створено / змінено
- ...

### Що перевірено
- ...

### Які залишились наступні кроки
- ...

### Який запис додати в PROMPTS_LOG.md
- ...

---

## Правило старту кожної нової задачі

Коли отримуєш нове завдання:
1. Спочатку звірся з `AI_WORKFLOW.md`
2. Перевір `PROMPTS_LOG.md`
3. Визнач тільки одну поточну фазу
4. Працюй тільки в рамках цієї фази
5. Після завершення коротко підсумуй зміни
6. Запропонуй наступний логічний крок, але не реалізовуй його без окремого запиту

---

## Пріоритет

Головний пріоритет:
1. робочий функціонал
2. чиста архітектура
3. читабельна структура
4. відтворюваний AI workflow
5. акуратна документація