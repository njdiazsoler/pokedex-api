# POKEDEX API
This is a small server to fetch data for the Pokédex Web application.
Host and Port have a default values in the config file. These variables could also be exported into an .env file.

## Available Scripts

In the project directory, you can run:

### `npm start`
Starts the server using 

### `npm test`
Runs jest to validate every test case.
There's currently a bug in the test suite where jest doesn't exit by itself, but stays connected.
Theoretically, the server connection opened by supertest is not closing after all test are executed, and close() and done() methods do not close the server connection.
For now, you should close jest using CTRL + C (Windows).
TCPSERVERWRAP BUG REPORT - https://github.com/visionmedia/supertest/issues/520