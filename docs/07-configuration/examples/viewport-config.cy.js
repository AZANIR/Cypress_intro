// ***********************************************************
// Налаштування viewport (розміру вікна браузера)
// Цей приклад демонструє тестування на різних розмірах екранів
// ***********************************************************

describe('Налаштування viewport', () => {
  it('має тестувати на дефолтному розмірі', () => {
    // Використовується розмір з cypress.config.js
    // За замовчуванням: 1280x720
    cy.visit('/')
    cy.get('.new-todo').should('be.visible')
  })
  
  it('має тестувати на desktop розмірі', () => {
    // cy.viewport() - встановлює розмір вікна браузера
    // 'macbook-15' - пресет для MacBook 15"
    cy.viewport('macbook-15')
    cy.visit('/')
    cy.get('.new-todo').should('be.visible')
  })
  
  it('має тестувати на tablet розмірі', () => {
    // 'ipad-2' - пресет для iPad
    cy.viewport('ipad-2')
    cy.visit('/')
    cy.get('.new-todo').should('be.visible')
  })
  
  it('має тестувати на mobile розмірі', () => {
    // 'iphone-x' - пресет для iPhone X
    cy.viewport('iphone-x')
    cy.visit('/')
    cy.get('.new-todo').should('be.visible')
  })
  
  it('має тестувати на кастомному розмірі', () => {
    // Встановлюємо кастомний розмір
    // Перший параметр - ширина, другий - висота
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.get('.new-todo').should('be.visible')
    
    // Змінюємо розмір під час тесту
    cy.viewport(375, 667) // Mobile розмір
    cy.get('.new-todo').should('be.visible')
  })
  
  it('має тестувати різні орієнтації', () => {
    cy.visit('/')
    
    // Портретна орієнтація
    cy.viewport('iphone-x', 'portrait')
    cy.get('.new-todo').should('be.visible')
    
    // Альбомна орієнтація
    cy.viewport('iphone-x', 'landscape')
    cy.get('.new-todo').should('be.visible')
  })
})

// Популярні пресети viewport:
// - 'macbook-15' - 1440x900
// - 'macbook-13' - 1280x800
// - 'ipad-2' - 768x1024
// - 'iphone-x' - 375x812
// - 'iphone-6' - 375x667
// - 'samsung-s10' - 360x760

// Орієнтації:
// - 'portrait' - портретна (вища ніж ширша)
// - 'landscape' - альбомна (ширша ніж вища)
