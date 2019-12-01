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

3. Create the configuration file for the backend, `src/server/config.json`.
   It must have the following structure:

```json
{
    "database": {
        "host": "<your.mysql.database.host>",
        "host": "<the database's port, 3306 by default>",
        "user": "<the database's user>",
        "password": "<the password for that user>",
        "dbName": "<the name of the database to use>"
    },
    "server": {
        "url": "<https://topprofes.public.url>",
        "port": "<port for the server to listen>",
        "usingProxy": true,
        "sessionSecret": "<some secure random secret>"
    }
}
```
  Set `server.usingProxy` to `true` if you are serving Top Profe behind a
  reverse proxy. In affirmative case, it is required to set the
  "X-Forwarded-Proto" header accordingly (it should always be HTTPS).

4. Run it!

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
