const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Project ID для Cypress Cloud
  projectId: 'p8283g',
  
  // E2E тестування
  e2e: {
    // Базовий URL для всіх тестів - TodoMVC React додаток
    baseUrl: 'https://todomvc.com/examples/react/dist/',
    // Патерн для пошуку тестових файлів
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Папка з підтримуючими файлами
    supportFile: 'cypress/support/e2e.js',
    // Встановлення та налаштування
    setupNodeEvents(on, config) {
      // Тут можна додати плагіни та налаштування
    },
  },
  
  // Таймаут за замовчуванням для команд (в мілісекундах)
  defaultCommandTimeout: 4000,
  
  // Розміри вікна браузера за замовчуванням
  viewportWidth: 1280,
  viewportHeight: 720,
  
  // Папки для збереження результатів
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  
  // Відключити запис відео (можна увімкнути при потребі)
  video: false,
  
  // Модифікація обструктивного коду
  modifyObstructiveCode: false,
})
