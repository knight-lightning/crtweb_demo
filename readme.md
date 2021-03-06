# Проект автотестов
Используются Playwright + Jest

В папке __tests__ находятся автотесты. (Или отдельно, должны называться *.test.js)

в папке models находятся модели по паттерну PageObject.

### Что нужно для запуска:
node (тестировал только на 15+, но должно и на 12+ работать)

## Шаги запуска:
1. Устанавливаем node
2. npm install - устанавливаем зависимости
3. npm test - запускаем все тесты

В конце получаем отчёт с общим количеством, прошедших и непрошедших тестов, время выполнения.


#### Чтобы запустить отдельный тест:
npm test -- loginPage.js

#### Настройки Jest:

В файле jest.config.js:

jest.setTimeout(50000) - для избегания проблем с асинхронным кодом

В файле package.json:

"test": "jest -w=1 --detectOpenHandles --forceExit"

jest - указываем наш тест раннер

-w=1 - количество потоков. Может задать фикс количествои или в %, например, -w=50%

--detectOpenHandles и --forceExit - для избегания проблем с асинхронным кодом

## CI

#### github actions
.github\workflows\nodejs.yml - пример запуска тестов в Github Actions

#### docker
docker run -it --rm --ipc=host playwright_test:v1

В интерективном режиме:
npm test

1
