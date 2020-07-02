# POKEDEX API
This is a small server to fetch data for the Pokédex Web application.
Api and Port variables have default values in the config file. These variables could also be exported into an .env file using a dotenv library.

## Available Scripts

In the project directory, you can run:

### `npm run start`
Starts the server using nodemon to watch the files.

### `npm test`
Runs jest to validate every test case.
There's currently a bug in the test suite where jest doesn't exit by itself, but stays connected.
Theoretically, the server connection opened by supertest is not closing after all test are executed, and close() and done() methods do not close the server connection.
For now, you should close jest using CTRL + C (Windows).
TCPSERVERWRAP BUG REPORT - https://github.com/visionmedia/supertest/issues/520

### `npx babel-node start`
Starts the server using babel node configs (recommended for docker containers).

If you are running the app in a docker container, I would recommend you use the following command:
```
$ docker build -t pokedex-api .
$ docker run -p 3001:3001 pokedex-api
```

The server is ready!