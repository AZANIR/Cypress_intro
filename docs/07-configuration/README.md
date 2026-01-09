# Тема 7: Конфігурація Cypress

## Цілі навчання

Після вивчення цієї теми ви зможете:

- Зрозуміти файл конфігурації `cypress.config.js`
- Навчитися налаштовувати основні параметри
- Ознайомитися з найважливішими опціями конфігурації
- Створювати конфігурації для різних середовищ

## Огляд конфігурації

### Структура cypress.config.js

Файл `cypress.config.js` містить всі налаштування Cypress:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Налаштування E2E тестування
  e2e: {
    setupNodeEvents(on, config) {
      // Налаштування плагінів
    },
  },
})
```

### Дефолтні значення

Cypress має багато дефолтних значень, які працюють "з коробки". Всі їх можна перевизначити в конфігурації.

### Принцип перевизначення параметрів

Щоб змінити параметр, просто додайте його в конфігурацію:

```javascript
module.exports = defineConfig({
  baseUrl: 'https://todomvc.com/examples/react/dist/',  // Перевизначаємо baseUrl
  defaultCommandTimeout: 5000,  // Перевизначаємо таймаут
})
```

## Основні параметри конфігурації

### baseUrl - базовий URL

Визначення базового URL для всіх тестів:

```javascript
baseUrl: 'https://todomvc.com/examples/react/dist/'
```

**Переваги:**
- Можна використовувати відносні шляхи: `cy.visit('/')`
- Зменшує дублювання коду
- Легше змінювати середовище

### defaultCommandTimeout - таймаути команд

Встановлення таймауту для кожної команди (в мілісекундах):

```javascript
defaultCommandTimeout: 4000  // 4 секунди
```

**Коли змінювати:**
- Для повільних сайтів - збільшити
- Для швидких сайтів - зменшити (швидші тести)

### fixturesFolder та specPattern - шляхи до файлів

Вказує шляхи до папок з фікстурами та патерн знаходження тестових скриптів:

```javascript
fixturesFolder: 'cypress/fixtures',
specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
```

### viewportWidth та viewportHeight - розміри вікна

Встановлює ширину та висоту вікна браузера:

```javascript
viewportWidth: 1280,
viewportHeight: 720
```

**Популярні розміри:**
- Desktop: 1280x720, 1920x1080
- Tablet: 768x1024
- Mobile: 375x667, 414x896

### screenshotsFolder та videosFolder - збереження результатів

Визначає шлях для збереження скріншотів та відео:

```javascript
screenshotsFolder: 'cypress/screenshots',
videosFolder: 'cypress/videos'
```

### video - запис відео

Вмикає/вимикає запис відео тестів:

```javascript
video: false  // Вимикаємо запис відео (швидше виконання)
```

### modifyObstructiveCode - модифікація коду

Дозволяє модифікувати код сторінки, що може заважати Cypress:

```javascript
modifyObstructiveCode: false
```

**Коли використовувати:**
- Якщо сайт використовує код, що блокує Cypress
- Зазвичай залишають `false`

## Повна конфігурація для TodoMVC

Приклад повної конфігурації:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Базовий URL для TodoMVC
  baseUrl: 'https://todomvc.com/examples/react/dist/',
  
  // E2E тестування
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Налаштування плагінів
    },
  },
  
  // Таймаут за замовчуванням
  defaultCommandTimeout: 4000,
  
  // Розміри вікна
  viewportWidth: 1280,
  viewportHeight: 720,
  
  // Папки для результатів
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  
  // Відключити відео
  video: false,
  
  // Модифікація коду
  modifyObstructiveCode: false,
})
```

## Практичні приклади

У папці `examples/` знаходяться робочі приклади:
- `custom-timeout.cy.js` - налаштування таймаутів
- `viewport-config.cy.js` - налаштування viewport

## Типові помилки

1. **Неправильний синтаксис у конфігурації**
   - Перевіряйте коми та дужки
   - Використовуйте правильний формат JavaScript

2. **Конфлікти між різними параметрами**
   - Деякі параметри можуть конфліктувати
   - Тестуйте зміни поступово

3. **Забування про валідацію значень**
   - Перевіряйте, що значення коректні
   - Таймаути мають бути в мілісекундах

4. **Проблеми з відносними шляхами**
   - Використовуйте абсолютні шляхи або перевіряйте відносні
   - Переконайтеся, що шляхи правильні

## Наступні кроки

Після вивчення цієї теми перейдіть до:
- [Тема 8: Cypress Cloud](../08-cloud/README.md)
