# PROMPTS_LOG.md

## Призначення
Цей файл містить ключові промпти по етапах розробки Time Tracker у форматі AI-first workflow.
Лог містить тільки великі кроки та важливі follow-up промпти, без мікрологу дрібних змін.

---

## Entry 001 — Project scaffold

**Етап:** Фаза 1 — Scaffold  
**Інструмент:** Codex  
**Branch:** `chore/project-scaffold`

### Ключовий промпт
Створи тільки scaffold для fullstack Time Tracker згідно з AI_WORKFLOW.md.

Потрібно:
- створити `frontend/` на React + TypeScript + Vite + TailwindCSS
- створити `backend/` на Node.js + Express + TypeScript
- додати базову структуру папок без бізнес-логіки
- створити root-файли:
  - `README.md`
  - `PROMPTS_LOG.md`
  - `.env.example`
- додати базовий Express bootstrap
- додати TypeScript configs
- додати placeholder structure для layered backend architecture:
  - routes
  - controllers
  - services
  - repositories
  - models
  - middlewares
  - validators
  - shared
- додати placeholder structure для frontend architecture:
  - pages
  - components
  - features
  - hooks
  - api
  - types
  - utils
  - shared
- не реалізовувати бізнес-логіку
- після завершення покажи структуру створених файлів

### Логіка
Починаємо з базового каркасу, щоб далі окремими фазами добудовувати models, repositories, services, controllers, routes і frontend UI без хаосу в структурі.

### Результат
Створено базовий monorepo-style scaffold для frontend і backend, готовий до наступних фаз реалізації.

### Змінені / створені файли
- `AI_WORKFLOW.md`
- `PROMPTS_LOG.md`
- `README.md`
- `.env.example`
- `frontend/...`
- `backend/...`

### Що перевірено
- існує коренева структура проєкту
- існують `frontend/` і `backend/`
- на бекенді є багатошарова placeholder-структура
- на фронтенді є розділення на pages/components/features/hooks/api/types/utils/shared
- бізнес-логіка ще не реалізована

### Мінімальні ручні правки
- заповнення `AI_WORKFLOW.md`
- стартове заповнення `PROMPTS_LOG.md`
- стартове заповнення `README.md`