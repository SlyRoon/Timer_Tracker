# AI_WORKFLOW.md

## 1. Роль цього файлу

Цей файл є **головною інструкцією для AI/Codex** під час розробки fullstack веб-додатка **Time Tracker** для тестового завдання на позицію **AI Web Developer**.

Будь-який наступний AI/Codex-крок у цьому репозиторії має починатися з читання:
1. `AI_WORKFLOW.md`
2. `PROMPTS_LOG.md`

Після цього потрібно:
- визначити поточний етап;
- працювати тільки в межах поточного етапу;
- не переходити до наступного етапу без окремого user prompt;
- після кожного виконаного user prompt оновити `PROMPTS_LOG.md`;
- самостійно виконати `git add`, `git commit` і спробувати `git push` у поточну branch;
- якщо commit або push не вдався, чітко показати помилку, етап збою і точну команду для ручного повтору;
- наприкінці коротко підсумувати зміни, перевірки, commit і push result.

---

## 2. Головна ціль проєкту

Потрібно поступово зібрати **робочий fullstack Time Tracker app** з:
- frontend;
- backend;
- database;
- clean architecture;
- README;
- PROMPTS_LOG.md;
- deploy-ready structure.

Проєкт має бути:
- працездатним;
- зрозуміло структурованим;
- побудованим через AI-first workflow;
- придатним до ручної перевірки по фічах і git branches;
- без хаотичної архітектури;
- без підходу "все в одному файлі".

Deploy-ready structure означає, що структура і конфігурація мають бути підготовлені до майбутнього deploy, але **на старті Docker не використовується** і не додається без окремого етапу або прямого запиту.

---

## 3. Поточний режим роботи

### 3.1. Працюй тільки поетапно
- Не генеруй весь проєкт одним кроком.
- Не змішуй кілька великих фіч в одному завданні.
- Один user prompt має відповідати одному чіткому етапу або одній логічній задачі.
- Якщо користувач явно обмежив scope етапом, не виходь за його межі.

### 3.2. Не роби зайве наперед
- Не додавай фічі, яких не просили.
- Не додавай бібліотеки без потреби.
- Не роби overengineering.
- Не створюй scaffold, якщо поточний етап тільки документаційний.
- Не створюй `frontend/`, `backend/`, `.env.example`, Docker-файли або технічні конфіги до етапу, де це прямо дозволено.
- Не створюй `.gitignore` у межах Етапу 0, якщо це переводить роботу в технічний scaffold.

### 3.3. Не ламай архітектуру
- Не обходь service layer.
- Не прибирай controller layer.
- Не перенось відповідальність між шарами хаотично.
- Не змішуй HTTP-логіку, бізнес-логіку і data access.

### 3.4. Мінімум ручних правок
- Проєкт створюється через AI-інструменти.
- Ручні правки допускаються тільки там, де реально треба підправити ENV, README, конфіги або дрібні неточності.
- Не вимагай від користувача вручну дописувати значну частину проєкту.

### 3.5. Пиши підтримуваний код
- Код має бути читабельним.
- Імена файлів, класів, функцій і змінних мають бути зрозумілими.
- Структура має бути передбачуваною.
- Краще просте і чисте рішення, ніж складне без практичної користі.

---

## 4. Стек проєкту

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

### Правило стеку
- Не змінюй стек без прямого окремого запиту.
- Не додавай Redux, Zustand, React Query, Docker, тестові фреймворки, ORMs, UI-бібліотеки чи інші інструменти "просто тому що так зручніше".
- Нові залежності додаються тільки тоді, коли вони потрібні для поточного етапу і не суперечать узгодженому стеку.

---

## 5. Архітектурні правила бекенда

Бекенд має використовувати багатошарову архітектуру:
- routes
- controllers
- services
- repositories
- models
- middlewares
- validators
- shared

### 5.1. Потік запиту

Обов'язковий потік:

```text
route -> controller -> service -> repository -> model -> MongoDB
```

### 5.2. routes
- Тільки реєструють endpoints.
- Тільки підключають потрібні middlewares.
- Не містять бізнес-логіки.
- Не працюють із БД напряму.

### 5.3. controllers
- Працюють тільки з HTTP-рівнем: `req`, `res`, `next`.
- Отримують дані з request.
- Викликають service.
- Повертають response.
- Не містять роботи з БД.
- Не містять складної бізнес-логіки.

### 5.4. services
- Містять тільки бізнес-логіку.
- Не працюють з `req` / `res`.
- Не знають про HTTP status codes як основну частину логіки.
- Не працюють напряму з Mongoose models, якщо є repository layer.

### 5.5. repositories
- Містять тільки роботу з БД.
- Ізолюють доступ до Mongoose models.
- Не містять HTTP-логіки.
- Не містять зайвої предметної логіки, яка має бути в services.

### 5.6. models
- Містять тільки Mongoose schema та model definitions.
- Не містять логіки controllers або services.

### 5.7. validators
- Валідують body, params і query.
- Використовують Zod у межах validation layer.
- Не містять бізнес-логіки.

### 5.8. middlewares
- Validation middleware.
- Error-handling middleware.
- Інші технічні middleware тільки якщо вони реально потрібні.

### 5.9. shared
- Shared types.
- Shared constants.
- Shared utils.
- Base helpers.
- Reusable infrastructure pieces.

### 5.10. Заборонено на бекенді
- Класти доступ до БД у controllers.
- Класти HTTP-логіку у services.
- Викликати Mongoose models напряму з controllers.
- Зберігати всю логіку в одному файлі.
- Робити "god service" або "god controller".
- Прибирати controller layer.

---

## 6. Архітектурні правила фронтенда

Фронтенд має розділяти:
- presentation/UI;
- state/logic;
- API client layer;
- shared types / utils.

### 6.1. Рекомендовані папки
- pages
- components
- features
- hooks
- api
- types
- utils
- shared

### 6.2. pages
- Композиція сторінки.
- Зв'язування блоків між собою.
- Мінімум логіки.
- Не складати всю логіку в page components.

### 6.3. components
- Переважно презентаційні UI-компоненти.
- Дрібні reusable-блоки.
- Без важкої бізнес-логіки.
- Без API calls всередині дрібних презентаційних компонентів.

### 6.4. features
- Логіка окремих функціональних блоків.
- Feature-specific hooks/components/helpers.
- Код, який має чітку прив'язку до конкретної фічі.

### 6.5. hooks
- Повторно використовувана логіка.
- Side effects.
- UI state orchestration.
- Data fetch orchestration, якщо це не краще винести в feature-level hook.

### 6.6. api
- Всі HTTP-виклики.
- Функції для роботи з backend endpoints.
- Без змішування з presentation layer.

### 6.7. types
- Frontend types.
- API response/request types.
- Shared UI-level typing.

### 6.8. utils
- Форматування часу.
- Маппінг.
- Прості допоміжні функції без прив'язки до React lifecycle.

### 6.9. shared
- Shared UI parts.
- Constants.
- Reusable primitives.

### 6.10. Заборонено на фронтенді
- Складати всю логіку в page components.
- Робити API calls всередині презентаційних компонентів.
- Дублювати один і той самий fetch logic у різних місцях.
- Тягнути всю логіку в один `App.tsx`.
- Робити page components занадто товстими.

---

## 7. Доменні сутності

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

## 8. Обов'язковий функціонал

### 8.1. Основний Time Tracker
- Start / Stop.
- Task input.
- Autocomplete з попередніх задач.
- Project dropdown.
- Active timer.

### 8.2. Today entries management
- Список сьогоднішніх записів.
- Редагування task name.
- Редагування project.
- Ручне коригування часу у форматі `hh:mm`.
- Видалення запису.
- Групування записів за проєктами.
- Показ загального часу по кожному проєкту.

### 8.3. Project CRUD
- Створення проєкту.
- Отримання списку проєктів.
- Редагування проєкту.
- Присвоєння кольору проєкту.

### 8.4. Reports
- Reports day/week/month.
- Totals.
- CSV export.

---

## 9. Git workflow

### 9.1. Основні правила
- Одна велика фіча = одна branch.
- Не змішувати непов'язані фічі в одній branch.
- Робити маленькі логічні коміти.
- Після кожного етапу коротко підсумовувати зміни.
- Вважати, що кожна branch може перевірятися окремо вручну.
- Після кожного виконаного user prompt Codex сам виконує `git status`, `git add .`, `git commit -m "<логічний commit message>"` і `git push origin <current-branch>`.
- Працюй у поточній branch, якщо користувач не попросив створити нову.
- Поточну branch визначай через `git branch --show-current`, якщо вона не очевидна.
- Не завершуй задачу без спроби commit.
- Не завершуй задачу без спроби push.
- Якщо commit або push не вдається через технічну причину, не приховуй це: покажи текст помилки, команду, яка впала, і точну команду для ручного повтору.

### 9.2. Приклади branch naming
- `chore/project-scaffold`
- `feat/backend-domain-foundation`
- `feat/backend-repositories`
- `feat/backend-services`
- `feat/backend-controllers`
- `feat/backend-routes`
- `feat/project-crud`
- `feat/time-entry-start-stop`
- `feat/today-entries-management`
- `feat/task-autocomplete`
- `feat/reports-csv`
- `feat/frontend-foundation`
- `feat/frontend-tracker-ui`
- `feat/frontend-today-entries`
- `feat/frontend-projects-ui`
- `feat/frontend-reports-ui`
- `chore/integration-polish`
- `docs/final-submission`

### 9.3. Commit style
Використовуй короткі commit messages:
- `docs: finalize workflow setup for stage 0`
- `chore: scaffold frontend and backend apps`
- `feat: add mongoose models for project and time entry`
- `feat: implement project repository layer`
- `feat: add timer start and stop service`
- `feat: connect tracker ui to timer api`
- `docs: update readme and prompts log`

---

## 10. PROMPTS_LOG.md rules

### 10.1. Що логувати
- Логуються всі виконані user prompts, які змінюють файли, правила, workflow або стан проєкту.
- Не ведеться мікролог кожної дрібної внутрішньої правки, але кожен user prompt після виконання має бути відображений у `PROMPTS_LOG.md`.
- Після кожного виконаного user prompt `PROMPTS_LOG.md` оновлюється автоматично, якщо є доступ до файлів.
- Якщо це follow-up у межах того самого етапу, не дублюй entry без потреби; додай короткий follow-up block тільки якщо scope суттєво змінився.

### 10.2. Що вважати ключовим промптом
Ключовим промптом вважай user prompt, який запустив етап або суттєву зміну scope.

### 10.3. Як логувати довгі prompts
- Якщо prompt короткий, можна зберегти його майже дослівно.
- Якщо prompt довгий, збережи `Original prompt summary` і `Original prompt (verbatim excerpt)` у markdown code block.
- Не вирізай суть prompt.
- Не підмінюй prompt власними припущеннями.
- Не замінюй original user prompt загальною фразою на кшталт "користувач попросив зробити scaffold".
- Поле `Original user prompt` є обов'язковим для нових entries.

### 10.4. Поля кожного entry
Кожен запис у `PROMPTS_LOG.md` повинен містити:
- Entry number.
- Етап.
- Інструмент.
- Branch.
- Дата або порядок виконання.
- Ключовий промпт.
- Original user prompt.
- Логіка.
- Результат.
- Змінені файли.
- Що перевірено.
- Мінімальні ручні правки.
- За потреби: Follow-up prompts.

---

## 11. Порядок етапів

Працюй тільки в цій послідовності, якщо користувач явно не просить інше. Не переходь до наступного етапу без окремого user prompt.

### Етап 0 — Rules and workflow setup
- Зафіксувати стек.
- Зафіксувати архітектурні правила.
- Зафіксувати workflow.
- Зафіксувати список етапів.
- Зафіксувати формат логування prompt.
- Зафіксувати старт без Docker.
- Підготувати `AI_WORKFLOW.md`.
- Підготувати `PROMPTS_LOG.md`.
- Підготувати ранній `README.md`.
- Не створювати технічний scaffold.

### Етап 1 — Project scaffold
- Створити `frontend/`.
- Створити `backend/`.
- Додати базові конфіги.
- Налаштувати Vite.
- Налаштувати TailwindCSS.
- Зробити Express bootstrap.
- Додати `.env.example`.
- Додати базову placeholder structure без бізнес-логіки.

### Етап 2 — Backend domain foundation
- Доменні моделі.
- Mongoose schemas.
- DB connection layer.
- Базові types / DTOs / shared contracts.

### Етап 3 — Repository layer
- Repositories для projects.
- Repositories для task names.
- Repositories для time entries.

### Етап 4 — Service layer
- Project services.
- Time tracking services.
- Today entries services.
- Autocomplete services.
- Reports services.

### Етап 5 — Controllers + validators + middlewares
- Controllers.
- Validation schemas.
- Validation middleware.
- Error handling baseline.

### Етап 6 — Routes wiring
- Route modules.
- Route registration.
- Controller binding.
- Middleware binding.

### Етап 7 — Project CRUD
- Create project.
- Get projects.
- Update project.

### Етап 8 — Timer start / stop backend
- Start timer.
- Stop timer.
- Active timer.
- One-active-timer rule.

### Етап 9 — Today entries management backend
- List today entries.
- Update task name.
- Update project.
- Manual duration correction.
- Delete entry.
- Grouping by project.
- Totals by project.

### Етап 10 — Task autocomplete backend
- Task suggestions.
- Search by prefix/text.
- Sorting by `lastUsedAt`.

### Етап 11 — Reports + CSV backend
- Day/week/month reports.
- Totals.
- Grouped output.
- CSV export endpoint.

### Етап 12 — Frontend foundation
- App shell.
- Routing.
- API layer.
- Base pages.
- Shared types.
- Hooks / features foundation.

### Етап 13 — Tracker UI
- Task input.
- Project select.
- Active timer block.
- Start/stop controls.
- Autocomplete dropdown.

### Етап 14 — Today entries UI
- Today entries list.
- Edit task/project.
- Manual time correction.
- Delete entry.
- Grouped totals UI.

### Етап 15 — Projects UI
- Project list.
- Create/edit project.
- Color selection.

### Етап 16 — Reports UI
- Reports page.
- Day/week/month switch.
- Totals display.
- CSV export button.

### Етап 17 — Integration polish
- End-to-end flow check.
- Loading/error states.
- UX cleanup.
- Bug fixes.
- Env/scripts cleanup.

### Етап 18 — Docs + submission
- Finalize README.
- Finalize PROMPTS_LOG.
- Architecture summary.
- Local setup instructions.
- Deploy notes.
- Submission-ready cleanup.

---

## 12. Старт без Docker

- На старті проєкт працює без Docker.
- Docker не додається в Етапі 0.
- Docker не додається в scaffold, якщо користувач прямо не просить або не створено окремий погоджений етап.
- Локальна розробка спочатку має спиратися на прості frontend/backend scripts і MongoDB connection, коли це буде дозволено відповідним етапом.

---

## 13. `.gitignore` policy

- Не створювати `.gitignore` в Етапі 0, якщо поточний scope обмежено правилами і документацією.
- Додати або оновити `.gitignore` на технічному scaffold/infra-етапі, коли це прямо входить у scope.
- `.gitignore` має захищати від коміту `node_modules/`, build outputs, logs, temp files, `.env`, editor/OS junk.
- Ніколи не комітити реальні `.env`, токени, API keys, секрети або Mongo connection strings із реальними credentials.

---

## 14. Security baseline

### 14.1. Secrets
- Не хардкодити секрети.
- Використовувати `dotenv`.
- Реальні секрети тримати тільки в `.env`.
- У репозиторій комітити тільки безпечні приклади env, коли це дозволено етапом.

### 14.2. Input validation
- Усі важливі request body / params / query валідувати через Zod.
- Не довіряти raw input з клієнта.
- Не передавати сирі дані напряму в data layer без перевірки.

### 14.3. Error handling
- Не повертати stack trace в production-style responses.
- Не розкривати зайві внутрішні технічні деталі в API responses.
- Використовувати централізований error handling pattern.

### 14.4. HTTP baseline
- Використовувати `cors`.
- Використовувати `express.json()`.
- Обробляти помилки акуратно.
- Не створювати небезпечні debug endpoints без потреби.

### 14.5. Mongo / data safety
- Не будувати хаотичні update-операції.
- Валідувати ідентифікатори.
- Не оновлювати поля, яких користувач не повинен змінювати.
- Тримати оновлення контрольованими.

### 14.6. Frontend safety
- Не зберігати секрети у frontend.
- Не вбудовувати приватні URL/keys у frontend code.
- Обережно працювати з необробленими значеннями, які відображаються в UI.

---

## 15. Optimization baseline

- Не займатися передчасною оптимізацією.
- Не дублювати однакові backend-запити без потреби.
- Повертати тільки потрібні поля, якщо це доречно.
- Робити Mongo aggregation тільки там, де це виправдано.
- Не тримати всю frontend-сторінку в одному компоненті.
- Виносити повторювану логіку в hooks / features.
- Не робити зайвих ререндерів через хаотичний state lifting.
- Не додавати важкі бібліотеки без прямої причини.

---

## 16. Dependency hygiene

### 16.1. Додавай залежність тільки якщо
- Вона потрібна для поточного етапу.
- Її не покриває поточний стек.
- Її користь більша за складність.
- Вона не суперечить обмеженням поточного етапу.

### 16.2. Не додавай без потреби
- State managers.
- Form libraries.
- Date libraries.
- UI frameworks.
- Utility mega-libraries.
- Тестові бібліотеки.
- Docker / infra tooling.
- Lint/format stacks, якщо це не окремий погоджений крок.

---

## 17. Структура проєкту, до якої треба прагнути

Це орієнтир для наступних етапів, а не дозвіл створювати scaffold у межах Етапу 0.

```text
root/
├─ AI_WORKFLOW.md
├─ PROMPTS_LOG.md
├─ README.md
├─ .env.example
├─ .gitignore
├─ frontend/
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ vite.config.ts
│  ├─ tailwind.config.*
│  ├─ postcss.config.*
│  └─ src/
│     ├─ pages/
│     ├─ components/
│     ├─ features/
│     ├─ hooks/
│     ├─ api/
│     ├─ types/
│     ├─ utils/
│     └─ shared/
└─ backend/
   ├─ package.json
   ├─ tsconfig.json
   └─ src/
      ├─ app.ts
      ├─ server.ts
      ├─ routes/
      ├─ controllers/
      ├─ services/
      ├─ repositories/
      ├─ models/
      ├─ middlewares/
      ├─ validators/
      └─ shared/
```

Не потрібно створювати 100 пустих файлів наперед. Структура має з'являтися поступово, відповідно до етапу.

---

## 18. Правило старту кожного нового завдання

Коли отримуєш новий user prompt:
1. Прочитай `AI_WORKFLOW.md`.
2. Прочитай `PROMPTS_LOG.md`.
3. Визнач поточний етап.
4. Визнач, чи це новий entry чи follow-up до поточного етапу.
5. Перевір branch і scope.
6. Перевір, чи поточний етап дозволяє створення нових технічних файлів.
7. Працюй тільки в межах цього етапу.
8. Після змін автоматично онови `PROMPTS_LOG.md` і збережи original user prompt.
9. Виконай `git status`, `git add .`, `git commit -m "<логічний commit message>"`.
10. Виконай `git push origin <current-branch>`.
11. Наприкінці дай короткий звіт, commit message, push result і наступний логічний крок.

---

## 19. Формат відповіді після кожного виконаного кроку

Після завершення задачі дай короткий звіт:

### Що зроблено
- ...

### Які файли створено / змінено
- ...

### Що перевірено
- ...

### Що автоматично оновлено
- ...

### Які наступні кроки
- ...

### Git commands
- `git status`
- `git add .`
- `git commit -m "..."`
- `git push origin <current-branch>`

### Commit
- commit hash
- commit message

### Push
- чи виконано push
- у яку branch
- якщо push не вдався: помилка і команда для ручного повтору

---

## 20. Definition of done для кожного етапу

Етап вважається завершеним тільки якщо:
- реалізовано саме те, що просили;
- scope етапу не перевищено;
- архітектура не зламана;
- не додано зайвих залежностей;
- `PROMPTS_LOG.md` оновлено, якщо етап важливий;
- original user prompt записано в `PROMPTS_LOG.md`;
- зміни додано в git;
- commit створено або явно показано причину збою;
- push виконано або явно показано причину збою;
- структура залишилася чистою;
- зміни можна локально перевірити;
- наступний крок логічно зрозумілий.

---

## 21. Що не можна робити

- Не звалювати всю логіку в один файл.
- Не прибирати controller layer.
- Не класти роботу з БД у controllers.
- Не класти HTTP-логіку у services.
- Не робити page components занадто товстими.
- Не переписувати непов'язаний код без причини.
- Не міняти стек без окремого запиту.
- Не робити Docker на старті.
- Не переходити до наступного етапу без запиту.
- Не забувати оновлювати `PROMPTS_LOG.md` після важливих етапів.
- Не створювати scaffold у документаційному етапі.
- Не хардкодити секрети.
- Не тягнути зайві бібліотеки.
- Не ускладнювати рішення без практичної причини.

---

## 22. Спеціальна примітка для README

Оскільки в цьому проєкті використовується MongoDB + Mongoose, а в тестових завданнях часто згадуються SQL/Postgres-приклади, під час фіналізації `README.md` коротко поясни вибір MongoDB як свідоме архітектурне рішення для цього Time Tracker.

---

## 23. Пріоритет

Головний пріоритет:
1. робочий функціонал;
2. чиста архітектура;
3. читабельна структура;
4. відтворюваний AI workflow;
5. коректний prompts log;
6. security baseline;
7. без зайвого сміття;
8. акуратна документація.
