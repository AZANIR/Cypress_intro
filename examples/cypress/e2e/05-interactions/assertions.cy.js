// ***********************************************************
// Перевірки (асерти) в Cypress
// Цей приклад демонструє різні типи перевірок
// ***********************************************************

describe('Перевірки стану елементів', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('має перевірити видимість елемента', () => {
    // .should('be.visible') - перевіряє, що елемент видимий
    cy.get('.new-todo').should('be.visible')
    
    // .should('not.be.visible') - перевіряє, що елемент не видимий
    // Наприклад, кнопка видалення спочатку прихована
    cy.get('.clear-completed').should('not.exist')
  })
  
  it('має перевірити існування елемента', () => {
    // .should('exist') - перевіряє, що елемент існує в DOM
    cy.get('h1').should('exist')
    
    // .should('not.exist') - перевіряє, що елемент не існує
    // У TodoMVC список існує в DOM, але може бути порожнім
    // Перевіряємо, що список порожній (немає елементів li)
    cy.get('.todo-list li').should('not.exist')
  })
  
  it('має перевірити текст елемента', () => {
    // .should('contain', 'text') - перевіряє, що елемент містить текст
    cy.get('h1').should('contain', 'todos')
    
    // Додаємо задачу
    cy.get('.new-todo').type('Тестова задача{enter}')
    
    // Перевіряємо, що задача містить текст
    cy.get('.todo-list li').should('contain', 'Тестова задача')
  })
  
  it('має перевірити значення поля', () => {
    // Вводимо текст
    cy.get('.new-todo').type('Текст у полі')
    
    // .should('have.value', 'text') - перевіряє значення input поля
    cy.get('.new-todo').should('have.value', 'Текст у полі')
  })
  
  it('має перевірити класи елемента', () => {
    // Додаємо задачу
    cy.get('.new-todo').type('Задача{enter}')
    
    // Спочатку задача не має класу 'completed'
    cy.get('.todo-list li').should('not.have.class', 'completed')
    
    // Відмічаємо задачу
    cy.get('.todo-list li').find('.toggle').check()
    
    // Тепер задача має клас 'completed'
    cy.get('.todo-list li').should('have.class', 'completed')
  })
  
  it('має перевірити кількість елементів', () => {
    // Додаємо кілька задач
    cy.get('.new-todo').type('Задача 1{enter}')
    cy.get('.new-todo').type('Задача 2{enter}')
    cy.get('.new-todo').type('Задача 3{enter}')
    
    // .should('have.length', number) - перевіряє кількість елементів
    cy.get('.todo-list li').should('have.length', 3)
  })
  
  it('має використовувати ланцюжки перевірок', () => {
    // Додаємо задачу
    cy.get('.new-todo').type('Задача{enter}')
    
    // Можна ланцюжком додавати кілька перевірок
    cy.get('.todo-list li')
      .should('have.length', 1)           // Перевіряємо кількість
      .should('contain', 'Задача')        // Перевіряємо текст
      .should('be.visible')                // Перевіряємо видимість
      .should('not.have.class', 'completed') // Перевіряємо клас
  })
  
  it('має використовувати .and() для ланцюжків', () => {
    // .and() - альтернативний спосіб ланцюжків (більш читабельний)
    cy.get('.new-todo')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'What needs to be done?')
      .and('have.class', 'new-todo')
  })
  
  it('має перевірити атрибути елемента', () => {
    // .should('have.attr', 'attr-name', 'value') - перевіряє атрибут
    cy.get('.new-todo')
      .should('have.attr', 'type', 'text')
      .should('have.attr', 'placeholder', 'What needs to be done?')
  })
  
  it('має перевірити стан чекбокса', () => {
    // Додаємо задачу
    cy.get('.new-todo').type('Задача{enter}')
    
    // Спочатку чекбокс не відмічений
    cy.get('.todo-list li').find('.toggle')
      .should('not.be.checked')
    
    // Відмічаємо чекбокс
    cy.get('.todo-list li').find('.toggle').check()
    
    // Тепер чекбокс відмічений
    cy.get('.todo-list li').find('.toggle')
      .should('be.checked')
  })
})

// Основні типи перевірок:
// - be.visible / not.be.visible - видимість
// - exist / not.exist - існування
// - contain - містить текст
// - have.text - має точний текст
// - have.value - значення поля
// - have.class - має клас
// - have.length - кількість елементів
// - be.checked - чекбокс відмічений
// - have.attr - має атрибут
