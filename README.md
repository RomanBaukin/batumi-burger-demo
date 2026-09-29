# ЖАР — демолендинг бургерной в Батуми

[Открыть сайт](https://batumi-burger-demo.vercel.app) · [Бриф](docs/brief.md) · [Изображения](docs/assets.md)

ЖАР — вымышленная городская бургерная. Сайт показывает пример лендинга для портфолио: каталог из 12 позиций, корзину с сохранением в браузере и оформление демозаказа. Оплаты, реальных заказов и сбора персональных данных нет.

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
npm test
npm run test:e2e
```

Для браузерных тестов нужен Chromium: `npx playwright install chromium`. В CI он ставится автоматически. Локально можно указать `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` на установленный браузер Chromium или Brave.

## Публикация

Vercel публикует `main` по адресу сайта. Для PR создаётся Preview и запускаются GitHub Actions. Переменные окружения сайту не нужны. Статус настройки: [docs/setup.md](docs/setup.md).
