# Статус настройки

- Next.js 16.3.7, React 19.3.0, TypeScript, Node.js 24.
- Служебная страница на русском; индексация отключена до разработки лендинга.
- Локальные lint, build и typecheck прошли; GitHub Actions выполняет те же проверки.
- GitHub: https://github.com/RomanBaukin/batumi-burger-demo
- Vercel: mr-web2/batumi-burger-demo, подключён к этому GitHub-репозиторию.
- Production branch: main. Рабочие ветки и PR создают preview-развёртывания.
- Секреты, .env.local, .vercel, node_modules и результаты сборки исключены из Git.

## Проверка автодеплоя

Этот документ проходит через PR для проверки Vercel preview и GitHub Actions. После слияния проверяется production-развёртывание из main. Результаты проверки доступны в статусах PR и панели Vercel.

## Совместимость

ESLint закреплён на 9.39.5: ESLint 10.11.0 несовместим с react/display-name в текущем eslint-config-next. npm сообщает о прекращении поддержки ESLint 9. Обновление возможно после совместимого релиза React-плагина. npm audit при установке: 0 известных уязвимостей.

Основной адрес служебной страницы: https://batumi-burger-demo.vercel.app. Первый Git-деплой завершился успешно.
