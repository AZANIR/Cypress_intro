# Cypress Навчальний Проект

Повноцінний Cypress проект з прикладами для навчального курсу автоматизованого тестування.

## Швидкий старт

### Передумови

- Node.js версія >= 16.x
- npm версія >= 8.x

### Встановлення

1. Встановіть залежності:
```bash
npm install
```

2. Запустіть Cypress в UI режимі:
```bash
npm run cypress:open
```

Або запустіть тести в headless режимі:
```bash
npm run cypress:run
```

## Структура проекту

```
examples/
├── cypress/
│   ├── e2e/                    # Тестові файли
│   │   ├── 01-intro/           # Тема 1: Огляд Cypress
│   │   ├── 02-setup/           # Тема 2: Встановлення
│   │   ├── 03-ui/              # Тема 3: Cypress UI
│   │   ├── 04-basic-constructions/  # Тема 4: Базові конструкції
│   │   ├── 05-interactions/    # Тема 5: Взаємодія з елементами
│   │   ├── 06-hooks/           # Тема 6: Хуки та анотації
│   │   ├── 07-configuration/   # Тема 7: Конфігурація
│   │   └── 08-cloud/           # Тема 8: Cypress Cloud
│   ├── fixtures/               # Тестові дані
│   └── support/                # Підтримуючі файли
│       ├── commands.js         # Кастомні команди
│       └── e2e.js              # Глобальні налаштування
├── cypress.config.js           # Конфігурація Cypress
└── package.json                # Залежності проекту
```

## Демо-сайт

Всі тести використовують [TodoMVC React](https://todomvc.com/examples/react/dist/) як демо-сайт для тестування.

## Команди

- `npm run cypress:open` - Відкрити Cypress UI
- `npm run cypress:run` - Запустити всі тести в headless режимі
- `npm run cypress:run:record` - Запустити тести з записом в Cypress Cloud
- `npm test` - Аліас для `cypress:run`

## Cypress Cloud

Проект налаштований для роботи з Cypress Cloud:

- **Project ID:** `p8283g` (додано в `cypress.config.js`)
- **Record Key:** налаштовано через змінну оточення `CYPRESS_RECORD_KEY`
- **Для використання:** 
  1. Створіть файл `.env` з Record Key (див. `.env.example`)
  2. Запускайте: `npm run cypress:run:record`
- **Результати:** будуть доступні в [Cypress Cloud Dashboard](https://cloud.cypress.io/)

**Налаштування:**
1. Скопіюйте `.env.example` в `.env`: `cp .env.example .env`
2. Відредагуйте `.env` та додайте ваш Record Key замість `your-record-key-here`
3. Файл `.env` ігнорується git (додано в `.gitignore`)

**Запуск:**

1. **Експортуйте змінні з .env файлу:**
```bash
# На macOS/Linux:
export $(cat .env | grep -v '^#' | xargs)

# АБО через source (якщо .env містить тільки змінні без export):
set -a
source .env
set +a
```

2. **Запустіть тести:**
```bash
npm run cypress:run:record
```

**Альтернатива (без експорту):**
```bash
# Встановіть змінну напряму перед командою
CYPRESS_RECORD_KEY=your-record-key npm run cypress:run:record
```

**Для CI/CD (GitHub Actions):**
Додайте `CYPRESS_RECORD_KEY` в Secrets репозиторію та використовуйте:
```yaml
- name: Run Cypress with record
  env:
    CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
  run: npm run cypress:run:record
```

**Безпека:** 
- ⚠️ Record Key НЕ зберігається в `.env.example` (тільки шаблон)
- ✅ Record Key зберігається в `.env` файлі, який не комітиться в репозиторій
- ✅ `.env` додано в `.gitignore` для безпеки

## Документація

Детальна документація для кожної теми знаходиться в папці `../docs/`.
