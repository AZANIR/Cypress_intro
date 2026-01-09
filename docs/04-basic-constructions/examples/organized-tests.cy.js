// ***********************************************************
// Структуровані тести для TodoMVC
// Цей приклад показує, як організувати тести в логічну структуру
// ***********************************************************

// Верхній рівень - загальна назва функціоналу
describe('TodoMVC - Управління задачами', () => {
  // Перший рівень вкладення - основні функції
  describe('Додавання задач', () => {
    it('має додати задачу при натисканні Enter', () => {
      cy.visit('/')
      cy.get('.new-todo').type('Нова задача{enter}')
      cy.get('.todo-list li').should('contain', 'Нова задача')
    })
    
    it('має очистити поле після додавання', () => {
      cy.visit('/')
      cy.get('.new-todo').type('Задача{enter}')
      cy.get('.new-todo').should('have.value', '')
    })
    
    it('має додати кілька задач поспіль', () => {
      cy.visit('/')
      cy.get('.new-todo').type('Задача 1{enter}')
      cy.get('.new-todo').type('Задача 2{enter}')
      cy.get('.new-todo').type('Задача 3{enter}')
      cy.get('.todo-list li').should('have.length', 3)
    })
  })
  
  // Другий блок - відмітка задач
  describe('Відмітка задач як виконаних', () => {
    beforeEach(() => {
      // Підготовка: додаємо задачі перед кожним тестом
      cy.visit('/')
      cy.get('.new-todo').type('Задача 1{enter}')
      cy.get('.new-todo').type('Задача 2{enter}')
    })
    
    it('має відмітити задачу як виконану', () => {
      // Відмічаємо першу задачу
      cy.get('.todo-list li').first().find('.toggle').check()
      
      // Перевіряємо, що задача має клас 'completed'
      cy.get('.todo-list li').first().should('have.class', 'completed')
    })
    
    it('має зменшити лічильник активних задач', () => {
      // Спочатку 2 активні задачі
      cy.get('.todo-count').should('contain', '2')
      
      // Відмічаємо одну
      cy.get('.todo-list li').first().find('.toggle').check()
      
      // Тепер 1 активна задача
      cy.get('.todo-count').should('contain', '1')
    })
  })
  
  // Третій блок - видалення задач
  describe('Видалення задач', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('.new-todo').type('Задача для видалення{enter}')
    })
    
    it('має видалити задачу при кліку на кнопку видалення', () => {
      // Наводимо мишку на задачу (щоб з'явилася кнопка)
      cy.get('.todo-list li').hover()
      
      // Клікаємо на кнопку видалення
      cy.get('.todo-list li').find('.destroy').click({ force: true })
      
      // Перевіряємо, що задача видалена
      cy.get('.todo-list li').should('not.exist')
    })
  })
  
  // Четвертий блок - фільтрація
  describe('Фільтрація задач', () => {
    beforeEach(() => {
      cy.visit('/')
      // Додаємо задачі
      cy.get('.new-todo').type('Активна 1{enter}')
      cy.get('.new-todo').type('Активна 2{enter}')
      cy.get('.new-todo').type('Виконана{enter}')
      
      // Відмічаємо останню як виконану
      cy.get('.todo-list li').last().find('.toggle').check()
    })
    
    it('має показувати всі задачі за замовчуванням', () => {
      cy.get('.todo-list li').should('have.length', 3)
    })
    
    it('має фільтрувати тільки активні задачі', () => {
      // Клікаємо на фільтр "Active"
      cy.contains('Active').click()
      
      // Має залишитися 2 активні задачі
      cy.get('.todo-list li').should('have.length', 2)
      cy.get('.todo-list li').should('not.have.class', 'completed')
    })
    
    it('має фільтрувати тільки виконані задачі', () => {
      // Клікаємо на фільтр "Completed"
      cy.contains('Completed').click()
      
      // Має залишитися 1 виконана задача
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('.todo-list li').should('have.class', 'completed')
    })
  })
})

// Найкращі практики організації:
// 1. Групуйте пов'язані тести в describe()
// 2. Використовуйте context() для різних сценаріїв
// 3. Використовуйте beforeEach() для підготовки даних
// 4. Назви тестів мають описувати очікувану поведінку
// 5. Уникайте занадто глибокого вкладення (максимум 2-3 рівні)
