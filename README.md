# Batumi Burger Demo

Демолендинг вымышленной бургерной в Батуми для портфолио. Сейчас подготовлен только технический каркас и служебная страница. Разработка лендинга начинается по отдельной команде владельца.

## Локальный запуск

Node.js 24, npm.

```sh
npm ci
npm run dev
```

Открыть http://localhost:3000.

## Проверки

```sh
npm run lint
npm run build
npm run typecheck
```

## Публикация

План: публичный GitHub, Vercel Git Integration, production из main и preview для PR. Факт подключения и проверки записывается в docs/setup.md. Переменные окружения для каркаса не нужны.

Бриф: [docs/brief.md](docs/brief.md).
