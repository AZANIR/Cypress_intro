# Інструкція з налаштування Cypress Cloud

## Крок 1: Реєстрація

1. Перейдіть на [Cypress Cloud](https://cloud.cypress.io/)
2. Натисніть "Sign Up" або "Log In"
3. Увійдіть через GitHub, Google або створіть обліковий запис

## Крок 2: Створення проекту

1. Після входу натисніть "Add Project"
2. Виберіть "Create a new project"
3. Введіть назву проекту (наприклад, "Cypress Intro Course")
4. Скопіюйте Project ID (потрібен для конфігурації)

## Крок 3: Отримання Record Key

1. Після створення проекту скопіюйте Record Key
2. Цей ключ потрібен для запуску тестів з записом

**Для цього проекту:**
- Record Key потрібно додати в `.env` файл (див. крок 5)
- Використовується через змінну оточення `CYPRESS_RECORD_KEY`

## Крок 4: Налаштування проекту

### Project ID вже додано в cypress.config.js

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'p8283g', // Вже налаштовано
  baseUrl: 'https://todomvc.com/examples/react/dist/',
  e2e: {
    // ... інші налаштування
  },
})
```

## Крок 5: Запуск тестів з записом

### Налаштування змінної оточення

1. Створіть файл `.env` в корені проекту `examples/`:
```bash
cp .env.example .env
```

2. Відредагуйте файл `.env` та додайте ваш Record Key:
```
CYPRESS_RECORD_KEY=your-record-key-here
```
**ВАЖЛИВО:** Замініть `your-record-key-here` на ваш реальний Record Key з Cypress Cloud.

### Локальний запуск

Через npm скрипт (рекомендовано):
```bash
# Просто запустіть (dotenv-cli автоматично завантажить .env)
npm run cypress:run:record

# АБО встановіть змінну напряму перед запуском
CYPRESS_RECORD_KEY=your-record-key npm run cypress:run:record
```

**Примітка:** Скрипт використовує `dotenv-cli` для автоматичного завантаження змінних з `.env` файлу. Не потрібно вручну завантажувати змінні через `source .env`.

Або напряму через Cypress CLI:
```bash
CYPRESS_RECORD_KEY=your-record-key npx cypress run --record
```

**Примітка:** 
- Скрипт `cypress:run:record` використовує змінну оточення `CYPRESS_RECORD_KEY`
- На Unix-системах (macOS/Linux) використовуйте `source .env &&` для завантаження змінних
- На Windows використовуйте `set CYPRESS_RECORD_KEY=... && npm run cypress:run:record`

## Крок 6: Перегляд результатів

1. Перейдіть на [Cypress Cloud Dashboard](https://cloud.cypress.io/)
2. Виберіть ваш проект
3. Перегляньте результати виконання тестів
4. Перегляньте відео та скріншоти

## Безпека

✅ **Налаштовано правильно:** Record Key зберігається в `.env` файлі, який не комітиться в git.

**Структура:**
- `.env.example` - шаблон БЕЗ Record Key (комітиться в репозиторій)
- `.env` - реальний файл з ключами (в `.gitignore`, не комітиться)

**Для використання:**
1. Скопіюйте `.env.example` в `.env`: `cp .env.example .env`
2. Відредагуйте `.env` та додайте ваш Record Key замість `your-record-key-here`
3. Експортуйте змінні: `export $(cat .env | grep -v '^#' | xargs)`
4. Запускайте: `npm run cypress:run:record`

**Альтернатива (через системну змінну):**
```bash
export CYPRESS_RECORD_KEY=your-record-key
npm run cypress:run:record
```

⚠️ **КРИТИЧНО:** Ніколи не комітьте `.env` файл або Record Key в репозиторій!

## Обмеження безкоштовного плану

- Обмежена кількість тестових запусків на місяць
- Обмежена кількість паралельних запусків
- Деякі функції доступні тільки в платних планах

## Наступні кроки

Після налаштування:
- Налаштуйте CI/CD інтеграцію (див. ci-integration.md)
- Перегляньте аналітику виконання тестів
- Налаштуйте сповіщення про помилки
