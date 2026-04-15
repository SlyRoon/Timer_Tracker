# Time Tracker

Fullstack Time Tracker app для тестового завдання на позицію AI Web Developer.

## Стек

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

## Архітектура

### Backend
Бекенд будується на багатошаровій архітектурі:

- routes
- controllers
- services
- repositories
- models
- middlewares
- validators
- shared

Потік:
`route -> controller -> service -> repository -> model -> MongoDB`

### Frontend
Фронтенд розділяється на:

- pages
- components
- features
- hooks
- api
- types
- utils
- shared

## Функціонал
Запланований функціонал:

- Start / Stop timer
- task name input
- task autocomplete
- project selection
- active timer
- today entries management
- project CRUD
- reports: day / week / month
- CSV export

## AI-first workflow
Проєкт створюється по фазах з логуванням ключових промптів у `PROMPTS_LOG.md`.

Основні документи:
- `AI_WORKFLOW.md`
- `PROMPTS_LOG.md`

## Поточний статус
Зараз реалізується Фаза 1 — scaffold.

## Локальний запуск
Інструкція буде доповнена після створення початкового scaffold і налаштування scripts.

## Deploy
Deploy-інструкція буде додана після реалізації основного функціоналу.