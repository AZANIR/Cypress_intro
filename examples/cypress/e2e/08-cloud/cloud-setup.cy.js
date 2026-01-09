// ***********************************************************
// Приклад тесту для демонстрації роботи з Cypress Cloud
// Цей тест показує базовий функціонал, який можна відстежувати в Cloud
// ***********************************************************

describe('Демонстрація роботи з Cypress Cloud', () => {
  it('має виконати базовий тест для Cloud', () => {
    // Відкриваємо TodoMVC
    cy.visit('/')
    
    // Додаємо задачу
    cy.get('.new-todo').type('Задача для Cloud{enter}')
    
    // Перевіряємо результат
    cy.get('.todo-list li').should('contain', 'Задача для Cloud')
  })
  
  it('має виконати повний workflow для Cloud', () => {
    cy.visit('/')
    
    // Додаємо кілька задач
    cy.get('.new-todo').type('Задача 1{enter}')
    cy.get('.new-todo').type('Задача 2{enter}')
    cy.get('.new-todo').type('Задача 3{enter}')
    
    // Відмічаємо одну як виконану
    cy.get('.todo-list li').first().find('.toggle').check()
    
    // Перевіряємо результат
    cy.get('.todo-list li.completed').should('have.length', 1)
    cy.get('.todo-count').should('contain', '2')
  })
})

// Після налаштування Cypress Cloud:
// 1. Запустіть тести з --record флагом
// 2. Перегляньте результати в Cypress Cloud Dashboard
// 3. Перевірте відео та скріншоти
// 4. Проаналізуйте історію виконання
