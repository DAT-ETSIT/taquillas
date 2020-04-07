taquillas
=========

Locker renting and management platform.

# Requirements

This app needs the following software to work properly:

  * Node.js v10+
  * Yarn 1.13+
  * A MySQL database.

# Setup

1. Download or clone this repository:

```sh
$ git clone https://github.com/dat-etsit/taquillas
$ cd taquillas
```

2. Install the required dependencies:

```sh
$ yarn install
```

3. Create the configuration files for the backend: `src/server/config/server.json` and `src/server/config/database.json`.
   You can copy the examples provided in the `config` folder:
```sh
$ cp src/server/config/serverExample.json src/server/config/server.json
$ cp src/server/config/databaseExample.json src/server/config/database.json
```
  Set `usingProxy` to `true` if you are serving Taquillas behind a
  reverse proxy. In affirmative case, it is required to set the
  "X-Forwarded-Proto" header accordingly (it should always be HTTPS).

4. Run migrations and seeders:

```sh
$ sequelize db:migrate
$ sequelize db:seed:all
```

5. Run it!

```sh
$ yarn start
```

# Development

Follow the same steps as for installing, making sure to install the development
dependencies.

To fire up the develpment version of the server, just run:

```sh
$ yarn run dev
```

---

&copy; 2019-2020 Delegación de Alumnos de Telecomunicación
