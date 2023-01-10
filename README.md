# Введение

Это [Next.js](https://nextjs.org/) проект, созданный с помощью [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Чтобы узнать больше о NextJS:

- [Next.js Документация](https://nextjs.org/docs) - информация о Next.js и API.
- [Learn Next.js](https://nextjs.org/learn) - интерактивный Next.js утториал.

---

## Начинаем

Чтобы запустить dev сервер на локалке нужно выполнить команду:

```bash
npm run dev
```

Нужно открыть [http://localhost:3000](http://localhost:3000) _НЕ 127.0.0.1:3000!_ в браузере, чтобы увидеть результат.

[API пути](https://nextjs.org/docs/api-routes/introduction) располагаются по url [http://localhost:3000/api](http://localhost:3000/api).

Папка `pages/api` относится к `/api/*`. Файлы в этой папке выполняются как [API пути](https://nextjs.org/docs/api-routes/introduction), а не React страницы.

# Деплой

### Подготовка к деплою

Перед деплоем необходимо на своей локальной машине выполнить команду

```bash
npm run lint
```

- Если в результате команды выведено сообщение (см. ниже), то можно заливать изменения в `main` ветку

```bash
✔ No ESLint warnings or errors
```

- Иначе, необходимо исправить ошибки
  > Если ошибки не исправить, то собрать проект не получится.

После этого можно заливать изменения из `dev` ветки в `main`. Желательно делать это с помощью `Pull Request`.

## Сервер

1. Нужно получить актуальную версию проекта с гита

```bash
git pull
```

2. Сборка проекта

```bash
cd /var/www/html/vyatsu_lk
npm install --save
sudo npm run build
```

3. (Не обязательный пункт) Для того, чтобы получить список текущих процессов нужно выполнить команду ниже. После этого скорее всего можно будет понять, как называется процесс с сервером **скорее всего это `npm`**.

```bash
pm2 ls
```

4. После сборки проекта, нужно его перезапустить. Для этого необходимо выполнить команды:

```bash
pm2 delete npm
pm2 start npm -- start
pm2 save
```

## Redis

Если Redis не запущен, упал и т.п. запустить его можно с помощью следующих команд из корневой директории проекта:

```bash
make dc_build # Сборка docker-compose
make dc_start # Запуск докер приложения
make dc_stop # Остановка докер приложения
make dc_restart # То же, что и "make dc_stop dc_start"
make dc_up # Билд и запуск докер приложения
make dc_down # Остановка и удаление докер приложения
```

Все команды и их расшифровка написаны в файле `./Makefile`. При необходимости можно добавить новые.

### Redis Пароль

При необходимости добавления пароля для Redis необходимо:

1. Изменить добавить в файл `./docker/redis/redis.conf` строку `requirepass *желаемый пароль*`
2. Изменить добавить переменную окружения `REDIS_PASSWORD=*желаемый пароль*` в файл `./docker/docker-compose.yml` для сервиса `redis-commander`.
<details> 
  <summary>Пример </summary>

```yaml
...
redis-commander:
  container_name: redis-commander
  build:
    context: ./../
    dockerfile: ./docker/redis-commander/Dockerfile
  environment:
    - REDIS_HOSTS=lk_redis:redis:${REDIS_PORT}
    - REDIS_PASSWORD=12345 # <--- пароль
  ports:
    - ${COMMANDER_PORT}:8081
  restart: always
...
```

</details>

3. Изменить `REDIS_URL` в файле `./.env` по шаблону `REDIS_URL=redis://default:PASSWORD@HOST:PORT`, т.е. строка должна выглядеть так:

```
...
REDIS_URL=redis://default:*PASSWORD*@127.0.0.1:6379
...
```

## Докер

Все докерфайлы, `.env` и `docker-compose.yml` находятся в `./docker`

Команды по работе с ними находятся в `./Makefile`. При необходимости можно все писать руками.

# Стек

Для работы приложения используется [Next.js](https://nextjs.org/). Он является фреймворком для [React.js](https://reactjs.org/).

В дополнение к реакту установлена библиотека для управления состояниями [Redux](https://redux.js.org/). Для удобной работы с API и более эффективной разработки используется [Redux Toolkit](https://redux-toolkit.js.org/). На бекенде и иногда на фронте для запросов используется [axios](https://axios-http.com/docs/intro).

Для сохранения состояния/_стейта_ приложения при переходе между страницами используется библиотека [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper).

Авторизация основана на [JWT](https://jwt.io/). Самописная, т.к. [Next Auth](https://next-auth.js.org/) не предоставил необходимой функциональности. Токены хранятся в куках браузера (для работы с куками используется [nookies](https://github.com/maticzav/nookies)). Функция установки токенов расположена в файле `./app/helpers/api/set-cookie-tokens.ts`. 

Для анимаций используется [React-Spring](https://www.react-spring.dev/).

Для удобной валидации форм [react-hook-form](https://react-hook-form.com/)

Для связи с редисом используется [redis-om](https://redis.io/docs/stack/get-started/tutorials/stack-node/). С помощью `Redis` происходит кэширование, в частности, например, поля `logged_as: ILoggedAs` у пользователей.

Для корректировки код стайла используется _Prettier_ и _ESLint_. Для программирования их **необходимо** использовать. Чтобы подключить Prettier к VS Code используется [расширение](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). Ему необходимо указат (если он сам не нашел) файл `.prettierrc` в корневой директории проекта. Для того, чтобы отформатировать файл, необходимо нажать сочетарние клавиш `Cntrl+Alt+Shift+P`.


