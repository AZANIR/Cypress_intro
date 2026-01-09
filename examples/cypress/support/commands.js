// ***********************************************************
// Кастомні команди Cypress
// Тут можна створити власні команди для повторного використання
// ***********************************************************

// Приклад кастомної команди для додавання задачі в TodoMVC
Cypress.Commands.add('addTodo', (text) => {
  // Знаходимо поле вводу та вводимо текст задачі
  cy.get('.new-todo')
    .type(text)
    .type('{enter}') // Натискаємо Enter для додавання задачі
})

// Приклад кастомної команди для видалення всіх задач
Cypress.Commands.add('clearAllTodos', () => {
  // Клікаємо на кнопку "Clear completed" якщо вона видима
  cy.get('body').then(($body) => {
    if ($body.find('.clear-completed').length > 0) {
      cy.get('.clear-completed').click()
    }
  })
})

// Додаємо TypeScript підтримку (якщо використовується TypeScript)
// declare namespace Cypress {
//   interface Chainable {
//     addTodo(text: string): Chainable<void>
//     clearAllTodos(): Chainable<void>
//   }
// }
