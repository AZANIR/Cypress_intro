# Інтеграція Cypress Cloud з CI/CD

## GitHub Actions

### Приклад workflow файлу

Створіть файл `.github/workflows/cypress.yml`:

```yaml
name: Cypress Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd examples
          npm install
      
      - name: Run Cypress tests
        working-directory: examples
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
        run: npm run cypress:run:record
```

### Налаштування секретів

1. Перейдіть в Settings → Secrets → Actions
2. Додайте `CYPRESS_RECORD_KEY` з вашим Record Key

## GitLab CI

### Приклад .gitlab-ci.yml

```yaml
stages:
  - test

cypress:
  stage: test
  image: cypress/browsers:latest
  script:
    - cd examples
    - npm install
    - npm run cypress:run:record
  variables:
    CYPRESS_RECORD_KEY: $CYPRESS_RECORD_KEY
  only:
    - main
    - develop
```

### Налаштування змінних

1. Перейдіть в Settings → CI/CD → Variables
2. Додайте `CYPRESS_RECORD_KEY` з вашим Record Key

## Jenkins

### Jenkinsfile приклад

```groovy
pipeline {
    agent any
    
    stages {
        stage('Test') {
            steps {
                dir('examples') {
                    sh 'npm install'
                    sh 'npm run cypress:run:record'
                }
            }
        environment {
            CYPRESS_RECORD_KEY = credentials('cypress-record-key')
        }
        }
    }
}
```

## CircleCI

### Приклад .circleci/config.yml

```yaml
version: 2.1

jobs:
  cypress:
    docker:
      - image: cypress/browsers:latest
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: |
            cd examples
            npm install
      - run:
          name: Run Cypress tests
          command: |
            cd examples
            npm run cypress:run:record
          environment:
            CYPRESS_RECORD_KEY: $CYPRESS_RECORD_KEY
```

## Переваги CI/CD інтеграції

1. **Автоматичний запуск тестів**
   - Тести запускаються автоматично при push
   - Не потрібно запускати вручну

2. **Історія виконання**
   - Всі запуски зберігаються в Cypress Cloud
   - Можна порівняти результати

3. **Сповіщення про помилки**
   - Автоматичні сповіщення при падінні тестів
   - Інтеграція з Slack, email тощо

4. **Паралельне виконання**
   - Можна запускати тести паралельно
   - Швидше виконання великих тестових наборів

## Налаштування сповіщень

1. Перейдіть в Settings проекту в Cypress Cloud
2. Налаштуйте сповіщення:
   - Email сповіщення
   - Slack інтеграцію
   - Webhook для кастомних інтеграцій
